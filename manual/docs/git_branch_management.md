---
title: "브랜치 관리"
link: "https://git-scm.com/book/en/v2/Git-Branching-Branch-Management"
link_text: "브랜치 관리는 어떻게 하나요?"
---

## 사전 조건

- [브랜치 & 머지](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)에 대해서 학습했습니다.

# 브랜치 관리

Git의 강력한 기능 중 하나는 브랜칭(branching)입니다. 브랜치를 사용하면 메인 코드라인에 영향을 주지 않고 새로운 기능을 개발하거나 버그를 수정할 수 있습니다. 이 문서에서는 Git 브랜치의 생성, 전환, 병합 등 다양한 관리 방법에 대해 설명합니다.

## 브랜치 개념 이해하기

브랜치는 독립적인 작업 라인을 나타냅니다. Git에서 브랜치는 단순히 특정 커밋을 가리키는 포인터입니다. 기본 브랜치 이름은 보통 'master' 또는 'main'입니다.

## 브랜치 생성

새 브랜치를 생성하는 방법은 다음과 같습니다:

```bash
git branch <브랜치명>
```

브랜치를 생성하고 동시에 해당 브랜치로 전환하려면:

```bash
git checkout -b <브랜치명>
```

Git 2.23 버전 이후부터는 `git switch` 명령어도 사용할 수 있습니다:

```bash
git switch -c <브랜치명>
```

## 브랜치 목록 확인

로컬 브랜치 목록을 확인하려면:

```bash
git branch
```

원격 브랜치를 포함한 모든 브랜치를 보려면:

```bash
git branch -a
```

## 브랜치 전환

다른 브랜치로 전환하려면:

```bash
git checkout <브랜치명>
```

또는 Git 2.23 이후 버전에서는:

```bash
git switch <브랜치명>
```

## 브랜치 병합

한 브랜치의 변경 사항을 다른 브랜치에 통합하려면 병합(merge)을 사용합니다:

```bash
git checkout <대상 브랜치>
git merge <병합할 브랜치>
```

### Fast-Forward 병합

대상 브랜치가 병합할 브랜치의 직접적인 상위에 있을 때 발생합니다. Git은 단순히 포인터를 앞으로 이동시킵니다.

### 3-way 병합

두 브랜치가 서로 다른 커밋을 가리키고 있을 때 발생합니다. Git은 두 브랜치의 공통 조상을 찾아 3-way 병합을 수행합니다.

## 병합 충돌 해결

병합 중 같은 파일의 같은 부분이 양쪽 브랜치에서 다르게 수정되었다면 충돌이 발생합니다. 이때는 수동으로 충돌을 해결해야 합니다:

1. `git status`로 충돌 파일 확인
2. 충돌 파일을 열어 충돌 부분 수정
3. 수정된 파일을 스테이징 영역에 추가 (`git add`)
4. 병합 커밋 생성 (`git commit`)

## 브랜치 삭제

로컬 브랜치를 삭제하려면:

```bash
git branch -d <브랜치명>  # 병합된 브랜치만 삭제
git branch -D <브랜치명>  # 강제 삭제
```

원격 브랜치를 삭제하려면:

```bash
git push origin --delete <브랜치명>
```

## 브랜치 리베이스

리베이스는 한 브랜치의 커밋들을 다른 브랜치로 이동시키는 과정입니다:

```bash
git checkout <브랜치명>
git rebase <대상 브랜치>
```

> 주의: 공개 브랜치에서는 리베이스를 사용하지 않는 것이 좋습니다.

## 브랜치 전략

### GitHub Flow

- 'main' 브랜치는 항상 배포 가능한 상태를 유지
- 새 기능 개발 시 'main'에서 분기하여 작업
- Pull Request를 통해 코드 리뷰 후 'main'에 병합

### GitFlow

- `master`: 제품 출시 브랜치
- `develop`: 개발 브랜치
- `feature`: 기능 개발 브랜치
- `release`: 출시 준비 브랜치
- `hotfix`: 긴급 버그 수정 브랜치

## 고급 브랜치 기술

### 브랜치 추적

원격 브랜치를 추적하는 로컬 브랜치를 설정할 수 있습니다:

```bash
git branch --track <브랜치명> origin/<브랜치명>
```

### 브랜치 비교

두 브랜치 간의 차이를 확인할 수 있습니다:

```bash
git diff <브랜치1>..<브랜치2>
```

### 스태시(Stash) 사용

작업 중인 변경사항을 임시 저장하고 브랜치를 전환할 수 있습니다:

```bash
git stash
git checkout <다른 브랜치>
# 작업 후
git checkout <원래 브랜치>
git stash pop
```

브랜치는 Git의 핵심 기능 중 하나입니다. 효과적인 브랜치 관리를 통해 협업을 원활히 하고, 코드의 안정성을 유지하며, 효율적인 개발 워크플로우를 구축할 수 있습니다.
