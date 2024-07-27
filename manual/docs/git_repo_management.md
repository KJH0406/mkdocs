---
title: "저장소 생성 및 클론"
link: "https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server"
link_text: "저장소 생성은 어떻게 하나요?"
---

## 사전 조건

- [네트워크 프로토콜](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols)에 대해서 학습했습니다.

# 저장소 생성 및 클론

Git 저장소(Repository)는 프로젝트의 모든 파일과 각 파일의 변경 이력을 포함합니다. 이 문서에서는 새로운 Git 저장소를 생성하는 방법과 기존 저장소를 클론하는 방법에 대해 자세히 설명합니다.

## 새 저장소 생성

### 로컬에서 새 저장소 생성하기

1. 먼저, 프로젝트를 시작할 새 디렉토리를 생성하고 해당 디렉토리로 이동합니다:

   ```bash
   mkdir my_project
   cd my_project
   ```

2. 다음 명령을 실행하여 Git 저장소를 초기화합니다:
   git init
   이 명령은 .git이라는 하위 디렉토리를 생성합니다. 이 디렉토리에는 저장소에 필요한 모든 Git 메타데이터가 포함됩니다.

3. 초기화 후에는 다음과 같은 작업을 수행할 수 있습니다:

- 파일 생성 또는 기존 파일 추가
- git add 명령으로 파일을 스테이징
- git commit 명령으로 변경사항 커밋

### GitHub, GitLab 등에서 새 저장소 생성하기

1. 해당 플랫폼의 웹사이트에 로그인합니다.
2. "New repository" 또는 유사한 옵션을 선택합니다.
3. 저장소 이름, 설명, 공개/비공개 설정 등을 입력합니다.
4. "Create repository" 버튼을 클릭합니다.
5. 생성된 저장소를 로컬 시스템에 클론합니다:
6. bashCopygit clone https://github.com/username/repository.git

### 기존 저장소 클론

- HTTPS를 사용하여 클론하기

1. 클론하려는 저장소의 URL을 복사합니다.
2. 터미널에서 다음 명령을 실행합니다:
   bashCopygit clone https://github.com/username/repository.git

3. Git은 해당 URL의 저장소를 현재 디렉토리의 하위 폴더로 클론합니다.

### SSH를 사용하여 클론하기

1. 먼저 SSH 키를 생성하고 GitHub/GitLab 계정에 등록해야 합니다.
2. 클론하려는 저장소의 SSH URL을 복사합니다.
3. 터미널에서 다음 명령을 실행합니다:
   bashCopygit clone git@github.com:username/repository.git

### 특정 브랜치만 클론하기

- 특정 브랜치만 클론하려면 -b 옵션을 사용합니다:
  bashCopygit clone -b branch_name https://github.com/username/repository.git
- 얕은 클론 (Shallow Clone)
  전체 이력이 필요 없는 경우, 가장 최근의 커밋만 클론할 수 있습니다:
  bashCopygit clone --depth 1 https://github.com/username/repository.git
- 클론 후 작업
  저장소를 클론한 후에는 다음과 같은 작업을 수행할 수 있습니다:

1. 디렉토리 변경:
   bashCopycd repository

2. 브랜치 확인:
   bashCopygit branch -a

3. 원격 저장소 정보 확인:
   bashCopygit remote -v

4. 최신 변경사항 가져오기:
   bashCopygit pull origin main

### 주의사항

- 대용량 저장소를 클론할 때는 네트워크 상태와 디스크 공간을 확인하세요.
- 비공개 저장소를 클론할 때는 적절한 권한이 있는지 확인하세요.
- 클론한 저장소의 원본 URL을 변경하려면 git remote set-url 명령을 사용하세요.

- 저장소 생성과 클론은 Git 작업의 기초입니다. 이를 통해 프로젝트를 시작하거나 기존 프로젝트에 참여할 수 있습니다.
