/**
 * Created by spm on 2/7/17.
 * 所有数据请求API
 */

export const LOGIN_ACTION = "?m=user&a=login";//  //用户登录
export const OUTLOGIN_ACTION = "?m=user&a=logout";//  //用户登录
export const SERVER_LIST_ACTION = "?m=server&a=serverList"; //服务器列表
export const ITEM_LIST_ACTION = "?m=itemName&a=book&sort=hits&p=1&sp="; //物品列表
export const ITEM_SEARCH_ACTION = "?m=search&t=itemName&p=1&sp="; //物品搜索
export const SEND_ITEM = "?m=send&a=item"; //发送物品