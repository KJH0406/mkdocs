---
title: "Git 설치"
link: "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"
link_text: "깃(Git)은 어떻게 설치하나요?"
---

## 사전 조건

- [Git의 역사](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git)에 대해서 학습했습니다.

# Git 설치

Git을 사용하기 위해서는 먼저 시스템에 설치해야 합니다. 주요 운영 체제별 설치 방법을 안내해 드리겠습니다.

## Windows에서 Git 설치

1. Git 공식 웹사이트(https://git-scm.com/)에서 최신 버전의 Git for Windows 설치 파일을 다운로드합니다.

2. 다운로드한 설치 파일을 실행합니다.

3. 설치 마법사의 지시를 따릅니다:

   - 라이선스 동의
   - 설치 위치 선택 (기본값 권장)
   - 시작 메뉴 폴더 선택
   - Git에서 사용할 기본 편집기 선택
   - PATH 환경 설정 (권장: "Git from the command line and also from 3rd-party software" 선택)
   - HTTPS 전송 백엔드 선택 (기본값 권장)
   - 줄 끝 변환 설정 (Windows 사용자의 경우 "Checkout Windows-style, commit Unix-style line endings" 권장)
   - 터미널 에뮬레이터 선택 (MinTTY 권장)
   - git pull 동작 설정 (기본값 권장)
   - 자격 증명 관리자 선택 (Git Credential Manager 권장)
   - 추가 옵션 설정 (필요에 따라 선택)

4. 설치가 완료되면 "Finish" 버튼을 클릭합니다.

## macOS에서 Git 설치

1. Homebrew를 사용하는 방법 (권장):

   - 터미널을 열고 다음 명령어를 입력합니다:
     ```
     brew install git
     ```
   - Homebrew가 설치되어 있지 않다면, 먼저 Homebrew를 설치해야 합니다:
     ```
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```

2. 직접 다운로드하여 설치하는 방법:
   - Git 공식 웹사이트에서 macOS용 설치 파일을 다운로드합니다.
   - 다운로드한 .dmg 파일을 실행하고 설치 과정을 따릅니다.

## Linux에서 Git 설치

대부분의 Linux 배포판에는 이미 Git이 사전 설치되어 있습니다. 설치되어 있지 않은 경우:

### Ubuntu/Debian

터미널에서 다음 명령어를 실행합니다:
sudo apt-get update
sudo apt-get install git

### Fedora

터미널에서 다음 명령어를 실행합니다:
sudo dnf install git

### CentOS/RHEL

터미널에서 다음 명령어를 실행합니다:
sudo yum install git

## 설치 확인

Git이 성공적으로 설치되었는지 확인하려면, 터미널(또는 Windows의 경우 Git Bash)에서 다음 명령어를 실행합니다:
git --version
이 명령어는 설치된 Git의 버전을 표시합니다. 버전 정보가 나타나면 Git이 올바르게 설치된 것입니다.
