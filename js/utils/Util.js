/**
 * Created by spm on 1/7/17.
 */
'use strict';
import Toast from 'react-native-root-toast';
import FetchHttpClient, { form, header } from 'fetch-http-client';
import fetchUrl from '../constants/fetchUrl';
const client = new FetchHttpClient(fetchUrl.appAPI);

let Util = {
    /**
    *
    * json转字符串
    */
    stringToJson: (data) => {
        return JSON.parse(data);
    },

    /**
    *字符串转json
    */
    jsonToString: (data) => {
        return JSON.stringify(data);
    },

    /**
    *map转化为对象（map所有键都是字符串，可以将其转换为对象）
    */
    strMapToObj: (strMap) => {
        let obj = Object.create(null);
        for ( let [k, v] of strMap ) {
            obj[k] = v;
        }
        return obj;
    },
    /**
    *map转换为json
    */
    mapToJson: (map) => {
        return JSON.stringify(strMapToObj(map));
    },

    /**
    	*对象转换为Map
    	*/
    objToStrMap: (obj) => {
        let strMap = new Map();
        for ( let k of Object.keys(obj) ) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    },
    /**
    *json转换为map
    */
    jsonToMap: (jsonStr) => {
        return objToStrMap(JSON.parse(jsonStr));
    },

    /**
    *请求头进行编码 参数为json数据
    */
    fetchHeadersJsonData: (data) => {
        return escape(JSON.stringify(data));
    },

    /**
    *请求头进行编码 参数为json字串
    */
    fetchHeadersJsonStr: (jsonStr) => {
        return escape(jsonStr);
    },

    strReplace: (str) => {
        //var str = '这是一个字符串[html]语句;[html]字符串很常见';
        //alert(str.replace(/\[|]/g,''));//移除字符串中的所有[]括号（不包括其内容）
        //输出：这是一个字符串html语句;html字符串很常见
        //alert(str.replace(/\[.*?\]/g,''));//移除字符串中的所有[]括号（包括其内容）
        //输出：这是一个字符串语句;字符串很常见
        return str.replace(/\<.*?\>/g, '');
    },

    /*
    ** 判断是否为数字
    */
    validate: (str) => {
	    var reg = new RegExp("^[0-9]*$");
	    if(!reg.test(str)){
	        return false;
	    }
	    return true;
	},

    /*
    ** get网络请求
    */
    fetchGet: (url, fetchkey, gameDataVersion, successCallback, failCallback) => {
        client.addMiddleware(request => {
            request.options.headers['vvcookie'] = Util.fetchHeadersJsonData(fetchkey); //escape(JSON.stringify(fetchkey)); //
        });
        client.get(url + '&versionType=' + String(gameDataVersion)).then(response => {
            return response.json();
        }).then((result) => {
            //console.log(result);
            successCallback(result);

        }).catch((error) => {
            failCallback(error);
            Toast.show('网络发生故障,请重试!', {
                position: Toast.positions.CENTER
            });
        });
    },
    /*
    ** post网络请求
    */
    fetchPost: (url, fetchkey, gameDataVersion, body, successCallback, failCallback) => {
        client.addMiddleware(form());
        client.addMiddleware(request => {
            request.options.headers['vvcookie'] = Util.fetchHeadersJsonData(fetchkey); //escape(JSON.stringify(fetchkey)); //
        });
        client.post(url + '&versionType=' + String(gameDataVersion), {
                  form: body,
              }).then(response => {
            return response.json();
        }).then((result) => {
            //console.log(result);
            successCallback(result);

        }).catch((error) => {
            failCallback(error);
            Toast.show('网络发生故障,请重试!', {
                position: Toast.positions.CENTER
            });
        });
    }
}

export default Util;