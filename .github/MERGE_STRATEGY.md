# GitHub Repository Merge Strategy Configuration

이 저장소는 **rebase merge** 전략을 사용하도록 구성되어 있습니다.

## 설정 방법

### 자동 설정 (권장)

이 저장소는 `.github/settings.yml` 파일을 통해 자동으로 구성됩니다. [Probot Settings](https://github.com/apps/settings) 앱을 설치하면 이 파일의 설정이 자동으로 적용됩니다.

### 수동 설정

GitHub 웹 인터페이스에서 다음 단계를 따라 수동으로 설정할 수 있습니다:

1. 저장소 페이지에서 **Settings** 탭으로 이동
2. **General** 섹션으로 스크롤
3. **Pull Requests** 섹션 찾기
4. 다음과 같이 설정:
   - ⬜ **Allow merge commits** (비활성화 - 3-way merge 방지)
   - ☑️ **Allow squash merging** (선택적으로 활성화)
   - ☑️ **Allow rebase merging** (활성화 - 이것이 주요 목표)
   - ☑️ **Automatically delete head branches** (활성화 권장)

## Rebase Merge의 장점

- **깔끔한 히스토리**: 선형적인 커밋 히스토리 유지
- **머지 커밋 없음**: 불필요한 merge commit이 생성되지 않음
- **이해하기 쉬움**: git log가 더 읽기 쉽고 추적하기 쉬움
- **충돌 해결**: 각 커밋별로 충돌을 해결하여 더 정확한 히스토리 유지

## Rebase Merge 사용 방법

Pull Request를 머지할 때:
1. GitHub PR 페이지에서 "Merge pull request" 버튼 옆 드롭다운 클릭
2. **"Rebase and merge"** 옵션 선택
3. 확인 버튼 클릭

또는 이 설정이 적용되면 기본 머지 방법으로 rebase merge가 사용됩니다.

## 참고사항

- Rebase merge를 사용하면 각 커밋이 대상 브랜치에 개별적으로 적용됩니다
- 커밋 히스토리를 깔끔하게 유지하려면 PR 전에 커밋을 정리하는 것이 좋습니다
- Force push가 필요한 경우가 있을 수 있으므로 주의가 필요합니다

---

# GitHub Repository Merge Strategy Configuration

This repository is configured to use **rebase merge** strategy.

## Configuration Methods

### Automatic Configuration (Recommended)

This repository is automatically configured through the `.github/settings.yml` file. Install the [Probot Settings](https://github.com/apps/settings) app to automatically apply these settings.

### Manual Configuration

Follow these steps to manually configure in GitHub web interface:

1. Go to **Settings** tab on the repository page
2. Scroll to **General** section
3. Find **Pull Requests** section
4. Configure as follows:
   - ⬜ **Allow merge commits** (disable - prevent 3-way merge)
   - ☑️ **Allow squash merging** (optionally enable)
   - ☑️ **Allow rebase merging** (enable - this is the main goal)
   - ☑️ **Automatically delete head branches** (recommended)

## Benefits of Rebase Merge

- **Clean History**: Maintains linear commit history
- **No Merge Commits**: Avoids unnecessary merge commits
- **Easy to Understand**: git log is more readable and trackable
- **Conflict Resolution**: Resolves conflicts per commit for more accurate history

## How to Use Rebase Merge

When merging a Pull Request:
1. Click the dropdown next to "Merge pull request" button on GitHub PR page
2. Select **"Rebase and merge"** option
3. Click confirm button

With this configuration applied, rebase merge will be available as a merge method.

## Notes

- With rebase merge, each commit is applied individually to the target branch
- It's recommended to clean up commits before PR to maintain clean history
- Be careful as force push may be required in some cases
