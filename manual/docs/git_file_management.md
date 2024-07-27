---
title: "파일 관리"
link: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository"
link_text: "파일 관리는 어떻게 하나요?"
---

## 사전 조건

- [레파지토리](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)에 대해서 학습했습니다.

# 파일 관리

Git을 사용하여 프로젝트의 파일을 효과적으로 관리하는 방법에 대해 자세히 알아보겠습니다. 파일의 상태 확인, 변경 사항 추적, 커밋 등의 기본적인 작업부터 고급 기능까지 다룹니다.

## 파일 상태 확인

### git status

현재 작업 디렉토리의 상태를 확인하는 가장 기본적인 명령어입니다.

```bash
git status
```

이 명령은 다음과 같은 정보를 제공합니다:

- 현재 브랜치
- 커밋되지 않은 변경사항
- 스테이징되지 않은 변경사항
- 추적되지 않는 파일

상세 정보가 필요 없다면 간단한 출력을 위해 `-s` 또는 `--short` 옵션을 사용할 수 있습니다:

```bash
git status -s
```

## 파일 추적 및 스테이징

### git add

변경된 파일을 스테이징 영역에 추가합니다.

```bash
git add <파일명>  # 특정 파일 추가
git add .         # 현재 디렉토리의 모든 변경 사항 추가
git add -A        # 작업 트리의 모든 변경 사항 추가
```

### git rm

파일을 Git에서 제거하고 작업 디렉토리에서도 삭제합니다.

```bash
git rm <파일명>
git rm --cached <파일명>  # Git에서만 제거하고 실제 파일은 유지
```

### git mv

파일 이름을 변경하거나 이동합니다.

```bash
git mv <이전 파일명> <새 파일명>
```

## 변경 사항 확인

### git diff

작업 디렉토리와 스테이징 영역 사이의 차이를 보여줍니다.

```bash
git diff            # 스테이징되지 않은 변경 사항 표시
git diff --staged   # 스테이징된 변경 사항 표시
```

## 변경 사항 커밋

### git commit

스테이징된 변경 사항을 저장소의 히스토리에 기록합니다.

```bash
git commit -m "커밋 메시지"
git commit -a -m "커밋 메시지"  # 추적 중인 파일의 변경 사항을 자동으로 스테이징하고 커밋
```

### 커밋 수정

마지막 커밋을 수정하려면:

```bash
git commit --amend
```

이 명령은 마지막 커밋 메시지를 수정하거나, 스테이징된 변경 사항을 마지막 커밋에 추가할 때 사용합니다.

## 파일 무시하기

`.gitignore` 파일을 사용하여 Git이 추적하지 않아야 할 파일을 지정할 수 있습니다.

예시 `.gitignore` 파일:

```
# 모든 .log 파일 무시
*.log

# build 디렉토리 무시
/build/

# node_modules 디렉토리 무시 (상대 경로)
node_modules/

# .env 파일 무시
.env
```

## 파일 히스토리 조회

### git log

커밋 히스토리를 조회합니다.

```bash
git log
git log --oneline  # 간단한 형식으로 표시
git log -p <파일명>  # 특정 파일의 변경 이력 확인
```

### git blame

각 라인의 최종 수정 커밋과 작성자를 표시합니다.

```bash
git blame <파일명>
```

## 변경 사항 되돌리기

### git checkout

작업 디렉토리의 변경 사항을 되돌립니다.

```bash
git checkout -- <파일명>
```

### git reset

스테이징된 변경 사항을 unstage 상태로 되돌립니다.

```bash
git reset HEAD <파일명>
```

### git revert

특정 커밋의 변경 사항을 취소하는 새 커밋을 생성합니다.

```bash
git revert <커밋 해시>
```

## 고급 기능

### git stash

현재 작업 중인 변경 사항을 임시로 저장합니다.

```bash
git stash save "작업 설명"
git stash list     # 저장된 stash 목록 확인
git stash apply    # 가장 최근의 stash를 적용
git stash pop      # stash를 적용하고 stash 목록에서 제거
```

### git cherry-pick

다른 브랜치의 특정 커밋을 현재 브랜치에 적용합니다.

```bash
git cherry-pick <커밋 해시>
```

### git clean

추적되지 않는 파일들을 삭제합니다.

```bash
git clean -n   # 삭제될 파일 미리보기
git clean -f   # 강제로 파일 삭제
```

## 파일 관리 팁

1. **자주 커밋하기**: 작은 단위로 자주 커밋하면 변경 사항을 추적하기 쉽고 문제가 생겼을 때 복구하기 쉽습니다.

2. **의미 있는 커밋 메시지 작성**: 커밋 메시지는 변경 사항을 명확하게 설명해야 합니다.

3. **브랜치 사용하기**: 새로운 기능이나 실험적인 변경을 위해서는 별도의 브랜치를 사용하세요.

4. **.gitignore 파일 활용**: 프로젝트에 불필요한 파일들을 Git이 추적하지 않도록 설정하세요.

5. **대용량 파일 주의**: Git은 큰 파일을 처리하는 데 효율적이지 않습니다. 대용량 파일은 Git LFS(Large File Storage)를 고려해보세요.

6. **정기적으로 git status 확인**: 작업 중 자주 `git status`를 실행하여 현재 상태를 파악하세요.

7. **pull 전에 commit하기**: 원격 저장소에서 pull 하기 전에 로컬 변경 사항을 커밋하는 습관을 들이세요.

Git을 사용한 효과적인 파일 관리는 프로젝트의 성공적인 버전 관리의 핵심입니다. 이러한 명령어와 팁들을 잘 활용하면 더욱 효율적인 개발 workflow를 구축할 수 있습니다.
