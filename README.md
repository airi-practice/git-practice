# git-practice

## 1. 概要

Git初心者が、Gitの基本的な仕組みを理解し、TortoiseGitで開発現場に必要な基本操作を身につけるための学習教材。

## 2. 学習ロードマップ

| STEP | 学習テーマ |
|---|---|
| 1 | Gitの基本 |
| 2 | ファイルの変更管理 |
| 3 | 変更の取り消し |
| 4 | ブランチによる作業の分割 |
| 5 | マージによる変更の統合 |
| 6 | 複数人での変更共有 |
| 7 | GitHubとプルリクエスト |
| 8 | Git操作を体験する |

## 3. 学習のゴール

学習を終えたとき、次のことができる状態を目指す。

- Gitの基本的な仕組みを説明できる
- TortoiseGit（Gitで使用するツール）で基本的な操作ができる
- 変更履歴を確認できる
- 変更を記録・取り消しできる
- ブランチを使って作業を分けられる
- 複数の変更を統合できる
- 他の人と変更を共有できる
- 競合が起きたときに解消できる

## 4. ディレクトリ構成

| ディレクトリ | 内容 |
|---|---|
| `docs/教科書/` | Gitの仕組みや操作方法を学ぶ教材 |
| `docs/課題/` | 教科書で学んだ内容を実際に操作して試す課題 |

## 5. 環境構築手順

教材を始める前に、次の4つを順番に済ませる。画像は `docs/images/` に置く。

1. Git を入れる(5-1)
2. TortoiseGit を入れる(5-2)
3. TortoiseGit を日本語にする(5-3)
4. GitHub のアカウントを用意する(5-4)

### 5-1. Git のインストール

Git は、ファイルの変更履歴を記録してくれるソフトだよ。この教材の主役で、先に入れておかないと TortoiseGit が動かない。

#### ダウンロード

1. ブラウザで Git for Windows の公式サイト(https://gitforwindows.org/)を開く。

   ![Git for Windows の公式サイトのトップページ](docs/images/setup-git-01-open-site.svg)

2. 「Download」ボタンを押す。ソフトの配布ページ(GitHub)が開く。

   ![「Download」ボタンの位置](docs/images/setup-git-02-download.svg)

   ページを下へ進み、「Assets」の一番上にある「Git-バージョン-64-bit.exe」を押して、インストーラーをダウンロードする。

   ![「Git-バージョン-64-bit.exe」のリンクの位置](docs/images/setup-git-02b-releases.svg)

#### インストール

3. ダウンロードしたインストーラーをダブルクリックして起動する。

   ![ダウンロードフォルダーにあるインストーラー](docs/images/setup-git-03-launch.svg)

4. 使用許諾の画面で「Next」を押す。

   ![Git のインストーラーの使用許諾の画面。内容を確かめて「Next」を押す](docs/images/setup-git-04-license.svg)

5. インストール先の画面で、何も変えずに「Next」を押す。

   ![インストール先の画面](docs/images/setup-git-05-destination.svg)

6. 部品の選択画面で、何も変えずに「Next」を押す。

   ![Git のインストーラーの部品の選択画面。何も変えずに「Next」を押す](docs/images/setup-git-06-components.svg)

7. スタートメニューの画面で、何も変えずに「Next」を押す。

   ![スタートメニューの画面](docs/images/setup-git-07-start-menu.svg)

8. 文章を書くソフト(エディター)の選択画面で、「Notepad」を選んで「Next」を押す。
   - Git は、たまに文章を入力する画面を開く。初めてでも使いやすいメモ帳(Notepad)にしておくよ。

   ![エディターの選択画面で Notepad を選んだ状態](docs/images/setup-git-08-editor.svg)

9. 最初のブランチ名の画面で、「Override the default branch name for new repositories」を選び、入力欄が `main` になっていることを確かめて「Next」を押す。
   - ブランチは作業の枝分かれのことで、教材の STEP 4 で学ぶ。今は「最初の枝の名前を main にする」と覚えておけば十分だよ。

   ![最初のブランチ名を main にした画面](docs/images/setup-git-09-branch-name.svg)

10. PATH の画面で、何も変えずに「Next」を押す。

    ![Git のインストーラーの PATH の画面。何も変えずに「Next」を押す](docs/images/setup-git-10-path.svg)

11. 残りの画面(SSH、HTTPS、改行の扱いなど)は、すべて何も変えずに「Next」を押して進める。

    ![Git のインストーラーの残りの画面の一例。何も変えずに「Next」を押して進める](docs/images/setup-git-11-defaults.svg)

12. 「Install」を押す。

    ![「Install」ボタンの画面](docs/images/setup-git-12-install.svg)

13. 完了画面で「Finish」を押す。

    ![Git のインストーラーの完了画面。「Finish」を押す](docs/images/setup-git-13-finish.svg)

#### 設定

14. スタートメニューから「Git Bash」を開く。Git Bash は、文字で命令を打ち込む黒い画面だよ。

    ![スタートメニューの「Git Bash」](docs/images/setup-git-14-open-bash.svg)

15. 次のコマンドを打って Enter キーを押し、バージョンが表示されれば、インストールは成功だよ。

    ```
    git --version
    ```

    ![バージョンが表示された Git Bash](docs/images/setup-git-15-version.svg)

16. 変更履歴に残す名前を登録する。`あなたの名前` は自分の名前(ローマ字がおすすめ)に書き換えて、Enter キーを押す。

    ```
    git config --global user.name "あなたの名前"
    ```

    ![名前を登録するコマンドを打った画面](docs/images/setup-git-16-set-name.svg)

17. 変更履歴に残すメールアドレスを登録する。`you@example.com` は自分のメールアドレスに書き換えて、Enter キーを押す。

    ```
    git config --global user.email "you@example.com"
    ```

    ![メールアドレスを登録するコマンドを打った画面](docs/images/setup-git-17-set-email.svg)

> [!TIP]
> **確認**
>
> - `git --version` でバージョンが表示された
> - 名前とメールアドレスを登録した

### 5-2. TortoiseGit のインストール

TortoiseGit は、Git をマウスで操作できるようにするソフトだよ。Git は本来、文字で命令を打ち込んで使う。TortoiseGit は、そのリモコンの役割をしてくれる。

#### ダウンロード

1. ブラウザで TortoiseGit の公式サイト(https://tortoisegit.org/download/)を開く。

   ![TortoiseGit のダウンロードページ](docs/images/setup-tortoise-01-open-site.svg)

2. 64bit 版のインストーラーをダウンロードする。

   ![64bit 版のダウンロードリンクの位置](docs/images/setup-tortoise-02-download.svg)

#### インストール

3. ダウンロードしたインストーラーをダブルクリックして起動する。

   ![ダウンロードフォルダーにあるインストーラー](docs/images/setup-tortoise-03-launch.svg)

4. 最初の画面で「Next」を押す。

   ![インストーラーの最初の画面](docs/images/setup-tortoise-04-welcome.svg)

5. 使用許諾の画面で、内容を確かめて「Next」を押す。

   ![TortoiseGit のインストーラーの使用許諾の画面。内容を確かめて「Next」を押す](docs/images/setup-tortoise-05-license.svg)

6. SSH クライアントの選択画面で、何も変えずに「Next」を押す。

   ![SSH クライアントの選択画面](docs/images/setup-tortoise-06-ssh.svg)

7. インストール先の画面で、何も変えずに「Next」を押す。

   ![インストール先の画面](docs/images/setup-tortoise-07-destination.svg)

8. 「Install」を押す。

   ![「Install」ボタンの画面](docs/images/setup-tortoise-08-install.svg)

9. 完了画面で「Finish」を押す。

   ![TortoiseGit のインストーラーの完了画面。「Finish」を押す](docs/images/setup-tortoise-09-finish.svg)

10. 再起動を求められたら、パソコンを再起動する。

    ![TortoiseGit のインストール後に、再起動を求める画面。パソコンを再起動する](docs/images/setup-tortoise-10-restart.svg)

#### 設定

11. 初回設定の画面(ウィザード)が出たら、言語を「English」のまま「Next」を押す。日本語にするのは 5-3 で行う。

    ![初回設定の言語の画面](docs/images/setup-tortoise-11-wizard-language.svg)

12. Git の場所を設定する画面で、場所が自動で入っていることを確かめて「Next」を押す。

    ![Git の場所を設定する画面](docs/images/setup-tortoise-12-wizard-git-path.svg)

13. 名前とメールアドレスの画面で、5-1 で登録した内容が入っていることを確かめて「Next」を押す。

    ![名前とメールアドレスの画面](docs/images/setup-tortoise-13-wizard-user.svg)

14. 認証の画面で、何も変えずに「Finish」を押す。

    ![TortoiseGit の最初の設定の、認証の画面。何も変えずに「Finish」を押す](docs/images/setup-tortoise-14-wizard-finish.svg)

15. 適当なフォルダーの何もない場所で右クリックし、「TortoiseGit」というメニューが出ることを確かめる。

    ![右クリックメニューに TortoiseGit が出ている画面](docs/images/setup-tortoise-15-context-menu.svg)

> [!TIP]
> **確認**
>
> - 右クリックのメニューに「TortoiseGit」が出た
> - 初回設定で、名前とメールアドレスが入っていた

### 5-3. TortoiseGit の日本語化

TortoiseGit は、そのままだと画面が英語だよ。日本語の言語パックを足して、表示を日本語にしよう。

#### ダウンロード

1. TortoiseGit のダウンロードページ(https://tortoisegit.org/download/)を開き、「Language Packs」の欄までスクロールする。

   ![TortoiseGit のダウンロードページの「Language Packs」の欄。日本語の言語パックを探す](docs/images/setup-lang-01-open-list.svg)

2. 自分のパソコンに合う版(64bit)の「Japanese」の行のリンクを押して、ダウンロードする。

   ![Japanese の行のダウンロードリンク](docs/images/setup-lang-02-download.svg)

#### インストール

3. ダウンロードした言語パックをダブルクリックして起動する。

   ![ダウンロードフォルダーにある言語パック](docs/images/setup-lang-03-launch.svg)

4. 最初の画面で「Next」を押す。

   ![言語パックのインストーラーの最初の画面](docs/images/setup-lang-04-welcome.svg)

5. 「Install」を押す。

   ![「Install」ボタンの画面](docs/images/setup-lang-05-install.svg)

6. 完了画面で「Finish」を押す。

   ![言語パックのインストーラーの完了画面。「Finish」を押す](docs/images/setup-lang-06-finish.svg)

#### 設定

7. 適当なフォルダーの何もない場所で右クリックし、「TortoiseGit」→「Settings」を選ぶ。

   ![右クリックメニューの「Settings」](docs/images/setup-lang-07-open-settings.svg)

8. 左の一覧の「General」を選び、「Language」の欄を「日本語」に変えて「OK」を押す。

   ![Language の欄を日本語にした設定画面](docs/images/setup-lang-08-select-language.svg)

9. もう一度、フォルダーの何もない場所で右クリックし、メニューが日本語になっていることを確かめる。

   ![日本語になった右クリックメニュー](docs/images/setup-lang-09-confirm.svg)

> [!TIP]
> **確認**
>
> - 右クリックのメニューが日本語で表示された

### 5-4. GitHub のアカウント

GitHub は、Git の記録を置いておく、インターネット上の共有の置き場所だよ。07章と08章で使う。
08章では、GitHub にサインインして、自分の変更を送る。そのために、アカウントを用意して、ユーザー名を確かめておこう。

すでに GitHub のアカウントを持っている人は、「アカウントを作る」を読み飛ばして、「ユーザー名を確認する」に進んでね。

#### アカウントを作る

1. ブラウザで GitHub のトップページ(https://github.com/)を開き、右上の「Sign up」を押す。

   ![GitHub のトップページの「Sign up」ボタン](docs/images/setup-github-01-open-site.svg)

2. メールアドレス、パスワード、ユーザー名を入れて、「Continue」を押す。
   - ユーザー名は、自分で決める。あとで使うので、メモしておこう
   - 画面は、項目が1つずつ順番に出ることもある。案内に従って進めばいい

   ![登録の画面。メールアドレス、パスワード、ユーザー名を入れる](docs/images/setup-github-02-signup-form.svg)

3. 登録したメールアドレスに、確認のコードが届く。メールを開いて、届いたコードを入れる。

   ![確認コードを入れる画面](docs/images/setup-github-03-verify.svg)

4. そのあとの案内の画面は、画面の指示に従って進める。アカウントができたら、サインインした状態になる。

#### ユーザー名を確認する

ユーザー名は、08章で GitHub にサインインするときに、聞かれることがある。メールアドレスとは別のものだよ。
自分のユーザー名を、次の方法で確かめて、メモしておこう。

5. GitHub にサインインした状態で、右上の丸いアイコンを押す。
6. 開いたメニューの「Signed in as」の下に出ている名前が、自分のユーザー名。

   ![メニューの「Signed in as」の下に、ユーザー名が出る](docs/images/setup-github-04-username.svg)

> [!TIP]
> **確認**
>
> - GitHub にサインインできた
> - 自分のユーザー名を確認して、メモした
