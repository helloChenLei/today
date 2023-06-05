const settingsDir = "./";
const settingsFile = "settings";
const settingsFileSuffix = ".json";

const contentDir = "data/";
const contentFileSuffix = ".json";

var currentPage = 1;
var settingsFileUrl = settingsDir + settingsFile + settingsFileSuffix;

// 获取配置后回调
var getSettingsCallbak = function(data) {
    $("title").text(data.title);
    vm.$data.settings = data;
    vm.$data.nav = data.nav;
    vm.$data.desc = data.desc;
    currentPage = data.newestPageNum;
    getJSON(buildContentFileName(), getContentCallbak);
    vm.$data.loadmore = true;
};

// 获取内容后回调
var getContentCallbak = function(data) {
    var item = {
        page: currentPage,
        data: data
    };
    vm.$data.items.push(item);
    $(".fancybox").fancybox();
    // vm.$data.items.push.apply(vm.$data.items, item)
};

// 构建内容文件名字
var buildContentFileName = function() {
    //return contentDir + currentPage + "/" + currentPage + contentFileSuffix;
    return contentDir + currentPage + "/" + "data" + contentFileSuffix;
}

// 获取JSON文件工具方法
var getJSON = function(url, callback) {

    var t = Date.parse(new Date()).toString().substr(0, 8);
    $.getJSON(url, {
        "reqTime": t
    },
    function(data, status) {
        // console.log(data);
        callback(data);
    }).done(function(d) {}).fail(function(d) {
        next();
    }).always(function(d) {});;

};

const {
    createApp
} = Vue;

const app = createApp({
    data() {
        return {
            items: [],
            settings:{},
            loadmore:false,
            loadbtn:"点击加载更多",
            nav:"",
            desc:""
        }
    },
    methods: {
        load(event) {
            next();
        }
    },
    mounted: function() {
        // const that = this;
        init();
        
    }
});

const vm = app.mount('#app');


function init() {

    // 加载配置文件
    getJSON(settingsFileUrl, getSettingsCallbak);
    
};

function next(){
    if (currentPage <= 1) {
        vm.$data.loadmore = false;
        vm.$data.loadbtn = "已无数据";
        return;
    };
    currentPage -= 1;
    getJSON(buildContentFileName(), getContentCallbak);
    if (currentPage <= 1 ){
        vm.$data.loadmore = false;
        vm.$data.loadbtn = "已无数据";
    }
}

