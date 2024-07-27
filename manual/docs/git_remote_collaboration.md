---
title: "원격 저장소 활용"
link: "https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches"
link_text: "Remote는 어떤 기능인가요?"
---

## 사전 조건

- [Branch 관리](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)에 대해서 학습했습니다.

# 원격 저장소 활용

Git은 분산 버전 관리 시스템으로, 원격 저장소를 통해 여러 개발자가 협업할 수 있습니다. 이 문서에서는 원격 저장소를 활용한 협업 방법과 관련 Git 명령어에 대해 자세히 설명합니다.

## 원격 저장소 개념

원격 저장소는 인터넷이나 네트워크 어딘가에 있는 저장소를 말합니다. 주로 GitHub, GitLab, Bitbucket 등의 플랫폼을 사용합니다.

## 원격 저장소 추가

로컬 저장소에 원격 저장소를 연결하려면:

```bash
git remote add <원격 저장소 이름> <원격 저장소 URL>
```

일반적으로 주 원격 저장소의 이름은 'origin'을 사용합니다:

```bash
git remote add origin https://github.com/username/repository.git
```

## 원격 저장소 확인

연결된 원격 저장소를 확인하려면:

```bash
git remote -v
```

## 원격 저장소에서 데이터 가져오기

### git fetch

원격 저장소의 데이터를 로컬로 가져오지만, 자동으로 병합하지는 않습니다:

```bash
git fetch <원격 저장소 이름>
```

모든 원격 브랜치에서 가져오려면:

```bash
git fetch --all
```

### git pull

원격 저장소에서 데이터를 가져오고 자동으로 현재 브랜치에 병합합니다:

```bash
git pull <원격 저장소 이름> <브랜치 이름>
```

예를 들어:

```bash
git pull origin main
```

## 원격 저장소에 변경사항 보내기

로컬의 커밋을 원격 저장소에 올리려면:

```bash
git push <원격 저장소 이름> <브랜치 이름>
```

예를 들어:

```bash
git push origin main
```

새로운 로컬 브랜치를 원격에 push하려면:

```bash
git push -u origin <브랜치 이름>
```

## 원격 브랜치 관리

### 원격 브랜치 목록 확인

```bash
git branch -r
```

### 원격 브랜치 삭제

```bash
git push origin --delete <브랜치 이름>
```

## Pull Request (또는 Merge Request)

Pull Request는 GitHub, GitLab 등의 플랫폼에서 제공하는 기능으로, 변경사항을 메인 브랜치에 병합하기 전에 코드 리뷰를 요청하는 메커니즘입니다.

1. 새 브랜치에서 작업을 완료하고 push합니다.
2. 원격 저장소 플랫폼에서 Pull Request를 생성합니다.
3. 팀원들이 코드를 리뷰하고 피드백을 제공합니다.
4. 필요한 경우 추가 커밋을 push하여 PR을 업데이트합니다.
5. 승인 후 PR을 병합합니다.

## 포크(Fork)와 클론(Clone)

### 포크

다른 사용자의 저장소를 자신의 계정으로 복사하는 것입니다. 주로 오픈소스 프로젝트에 기여할 때 사용됩니다.

### 클론

저장소의 전체 복사본을 로컬 시스템에 다운로드합니다:

```bash
git clone <저장소 URL>
```

## 협업 워크플로우

### 중앙집중식 워크플로우

- 모든 개발자가 메인 브랜치에서 직접 작업하고 push합니다.
- 소규모 팀에 적합합니다.

### 피처 브랜치 워크플로우

- 각 기능을 별도의 브랜치에서 개발합니다.
- 코드 리뷰 후 메인 브랜치에 병합합니다.

### Gitflow 워크플로우

- 'develop', 'feature', 'release', 'hotfix' 등 여러 종류의 브랜치를 사용합니다.
- 대규모 프로젝트에 적합합니다.

### Forking 워크플로우

- 각 개발자가 프로젝트를 포크하여 작업합니다.
- 오픈소스 프로젝트에 많이 사용됩니다.

## 충돌 해결

원격 저장소와 로컬 저장소의 변경사항이 충돌할 경우:

1. `git pull`을 실행하여 변경사항을 가져옵니다.
2. 충돌이 발생한 파일을 수정합니다.
3. 수정된 파일을 스테이징하고 커밋합니다.
4. 다시 `git push`를 실행합니다.

## 태그 관리

### 태그 생성

```bash
git tag <태그 이름>
git tag -a <태그 이름> -m "태그 메시지"  # 주석이 있는 태그
```

### 태그 푸시

```bash
git push origin <태그 이름>
git push origin --tags  # 모든 태그 푸시
```

## 서브모듈

다른 Git 저장소를 현재 저장소의 하위 디렉토리로 포함시킬 수 있습니다:

```bash
git submodule add <저장소 URL> <경로>
```

원격 저장소 활용은 Git을 이용한 협업의 핵심입니다. 이러한 기능들을 잘 활용하면 효율적인 팀 협업과 프로젝트 관리가 가능해집니다.
