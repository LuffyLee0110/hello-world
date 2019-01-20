export default  {
    isArray: function (o) {
      return Object.prototype.toString.call(o) == '[object Array]';
    },
  
    /*判断对象是否非空*/
    isEmpty: function (obj) {
      if (obj === undefined) {
        return true
      } else {
        if (typeof(obj) === "object") {
          for (var key in obj) {
            return false
          }
          return true
        } else {
          return true
        }
      }
  
    },
  
    dateformat: function () {
      Date.prototype.format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      };
    },
  
    timeStampToDateTime: function (timestamp) {
      var date = new Date(timestamp);
      return date.format('yyyy-MM-dd hh:mm:ss');
    },
  
    timeStampToDate: function (timestamp) {
      var date = new Date(timestamp);
      return date.format('yyyy-MM-dd');
    },
  
    formatDateString(val, format){
      if (typeof(val) == 'string' ) {
        var str = val.substr(0, 4) + "-" + val.substr(4, 2) + "-" + val.substr(6, 2) + " "
          + val.substr(8, 2) + ":" + val.substr(10, 2) + ":" + val.substr(12, 2);
        var date = new Date(str)
        return date.format(format)
      }
    },
  
    stringToDate(val){
      if (typeof(val) == 'string' ) {
        var str = val.substr(0, 4) + "-" + val.substr(4, 2) + "-" + val.substr(6, 2) + " "
          + val.substr(8, 2) + ":" + val.substr(10, 2) + ":" + val.substr(12, 2);
        var date = new Date(str)
        return date
      }
    },
  
    dateToShortString(date){
      return date.format('yyyyMMddhhmmss');
    },
  
    /**
     * 对象合并,覆盖已有属性
     * @param copyObj
     * @param fromObj
     */
    extend(copyObj, fromObj) {
      if (typeof(copyObj) === "object" && typeof(fromObj) === "object") {
        for (var p in fromObj) {
          if (fromObj.hasOwnProperty(p))
            copyObj[p] = fromObj[p];
        }
      }
    }
  }
  