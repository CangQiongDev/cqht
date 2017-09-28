
keytool -genkey -alias spmkey3 -keypass spmkey3 -keyalg RSA -keysize 1024 -validity 3650 -keystore F:\spmkey3.keystore -storepass spmkey3

说明：

-genkey 说明此命令用于产生证书
-alias 给证书一个别名，本例为“spmkey”
-keypass 密钥库的密码，本例为“spmkey”
-keyalg 加密方式，本例为“RSA”
-keysize 密钥长度，本例为“1024”
-validity 有效期，单位“天”
-keystore 密钥存储的位置，本例为“F:\spmkey.keystore”
-storepass 存储库密码，本例为“spmkey”

react-native run-android

cd D:\react-native\react-native-Gank && d:
cd android && gradlew assembleRelease --stacktrace --debug
cd android && gradlew assembleRelease --console plain

2.在/android/目录中执行gradlew assembleRelease命令，打包后的文件在 android/app/build/outputs/apk目录中，例如app-release.apk。如果打包碰到问题可以先执行 gradlew clean 清理一下。
如果出现报 unable to process incoming event 'ProcessComplete'  <ProgressCompleteEvent>这种错误
需要在在混淆文件proguard-rules.pro中加入
-keep class android.text { *; }
-dontwarn android.text.*
npm uninstall react-native-swipeable --save
npm install react-native@0.42 --save
npm unlink react-native-smart-barcode