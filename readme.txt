
keytool -genkey -alias spmkey3 -keypass spmkey3 -keyalg RSA -keysize 1024 -validity 3650 -keystore F:\spmkey3.keystore -storepass spmkey3

˵����

-genkey ˵�����������ڲ���֤��
-alias ��֤��һ������������Ϊ��spmkey��
-keypass ��Կ������룬����Ϊ��spmkey��
-keyalg ���ܷ�ʽ������Ϊ��RSA��
-keysize ��Կ���ȣ�����Ϊ��1024��
-validity ��Ч�ڣ���λ���족
-keystore ��Կ�洢��λ�ã�����Ϊ��F:\spmkey.keystore��
-storepass �洢�����룬����Ϊ��spmkey��

react-native run-android

cd D:\react-native\react-native-Gank && d:
cd android && gradlew assembleRelease --stacktrace --debug
cd android && gradlew assembleRelease --console plain

2.��/android/Ŀ¼��ִ��gradlew assembleRelease����������ļ��� android/app/build/outputs/apkĿ¼�У�����app-release.apk���������������������ִ�� gradlew clean ����һ�¡�
������ֱ� unable to process incoming event 'ProcessComplete'  <ProgressCompleteEvent>���ִ���
��Ҫ���ڻ����ļ�proguard-rules.pro�м���
-keep class android.text { *; }
-dontwarn android.text.*
npm uninstall react-native-swipeable --save
npm install react-native@0.42 --save
npm unlink react-native-smart-barcode