Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。

## git是一个管理软件 可以通过该软件来对你的代码进行托管(存入仓库)
而仓库又分为本地仓库和远程仓库 
git软件的使用又分为命令行操作和图形化界面  

我们来开始学习git   
1. 下载安装git软件 
https://www.cnblogs.com/xueweisuoyong/p/11914045.html

2.检测

Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0602/test
## 起名字 
$ git config --global user.name 'gao'

Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0602/test

## 起邮箱
$ git config --global user.email 'gao@qq.com'

## 查看刚刚的配置 
Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0602/test
$ git config user.name
gao

Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0602/test
$ git config user.email
gao@qq.com

## Linux常用命令 
创建文件夹  mkdir + 空格 + 文件夹名称
删除文件夹 rmdir + 空格 + 文件夹名称(不能直接删除非空的文件夹)

cd + 文件夹名称  进入文件夹 
创建文件  touch + 空格 + 文件名称

查看文件夹中的所有文件 
ls (-l) 


可读权限：r
可写权限：w
可执行权限：x 

权限位  所有者  所属组  其它人  
        rw-    r--     r-- 
- rw-r--r-- 

## 编辑文件
linux有内置的编辑器 vi(vim)

vi + 空格 + 要编辑的文件名 进入编辑模式  
切换到编辑模式  使用i 

如何保存?
先切换出编辑模式   esc  
再按住shift+":"
在下面的":"中输入 "wq" 然后回车 意思是退出并保存 

退出不保存  
先切换出编辑模式   esc  
再按住shift+":" 
在下面的":"中输入 "q!" 然后回车（强制退出不保存）

如何查看文件中的内容?
cat + 空格 + 文件名称

如何查看当前目录？
pwd  
$ pwd
/c/phpStudy/PHPTutorial/WWW/web/0602/test/t1

清屏： clear  

---------------------------------------------------------

## git的基本操作 

1. 创建版本库
$ git init
Initialized empty Git repository in C:/phpStudy/PHPTutorial/WWW/web/0602/test/t2/.git/

Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0602/test/t2 (master)
$
会生成一个.git文件   用来跟踪版本 不要删除
(master) -- git当中的主分支  

【工作区】
工作区就是不包括.git在内的整个项目目录

【暂存区】
缓存区是一个看不见的区域，我觉得这是Git的一个安全机制吧，就是说你提交代码的时候有可能会提交一些错误的代码，所以这个区域就是为了让你有机会反悔提交的代码。在项目目录下使用指令“git add fileName”就可以吧代码存入缓存区，这里的fileName是指的要往缓存区添加的文件名，当然也可以使用“.”代表当前的整个目录。“git status”可以查看缓存区有什么文件

如何将工作区中的文件提交到暂存区 
git add + 文件名  
或者 
git add .  (这里的.代表工作区中的全部文件)

【版本区】

将暂存区中的文件提交给版本区  
git commit -m '这里添加自定义提交信息'

这里会报错  
warning: LF will be replaced by CRLF in a.txt.
The file will have its original line endings in your working directory

因为被编辑的文件中含有回车会报警告错误  
linux和windows的换行符不一致  

解决: 
git config --global core.autocrlf false

如何查看文件是否添加成功?
git status  

## 差异对比 

先创建一个文件 d.txt 并写入内容 
提交  
git add . 
git commit -m 'no3'
修改工作区中的d.txt  
然后运行 git diff  比较暂存区和工作区  

$ git diff  
diff --git a/d.txt b/d.txt
index 1d60b70..59f2d82 100644
--- a/d.txt // 暂存区中的 d.txt
+++ b/d.txt // 工作区中的 d.txt 
@@ -1 +1,2 @@
 ddd
+eee

## git日志和版本号  
git log  显示最近到最远的所有提交的日志
git reflog  具体显示每次提交的 commit id  

回退到上一个版本 
git reset --hard
git reset --hard + 版本号回退到指定版本 

## 删除文件 
git rm xxx.txt  删除git中的指定文件 同时干掉工作区中的文件  

rm xxx.txt  只干掉工作区中的文件 

## 分支 

重新创建一个文件夹demo2
进入文件夹 初始化 git init  
vi a.txt  
git add . 
git commit -m 'no1'

创建一个分支test  
git checkout -b test 

Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0603/demo2 (master)
$ git checkout -b test
Switched to a new branch 'test'

Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0603/demo2 (test)
$

创建新的分支会从主分支中复制文件  
在test分支中查看文件 仍然可以看到 a.txt  

查看当前所在的分支   git branch  
$ git branch
  master
* test

切换分支  git checkout master 

$ git checkout master
Switched to branch 'master'

修改新分支中的文件内容  主分支中的文件内容不会发生变化 

## 不要在空分支下面再创建空分支  

## 删除分支 
$ git branch -d dev 
Deleted branch dev (was 297c0e9).

比较两个分支之间的不同 
git diff 分支1名称 分支2名称 

## 合并分支 
git merge + 要合并的分支名称  

注: 有可能会报错:Permission denied   
解决: 删除.git下面的index.lock  
rm -f .git/index.lock  


## 远程仓库 

$ git remote add origin https://github.com/gxf9532/snaker.git

推送  
git push -u origin master  

拉取
git pull origin master  

https://github.com/gxf9532/react_admin.git

本地创建新分支 
git checkout -b dev  

将本地dev分支推送到远程
git push origin dev

根据远程dev生成本地dev

Administrator@WIN-K15M778LIA3 MINGW32 /c/phpStudy/PHPTutorial/WWW/web/0603/project/react_admin (master)
$ git checkout -b dev origin/dev(注意这里 origin/dev)

这里是最新版本






















































