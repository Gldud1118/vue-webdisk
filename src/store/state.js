const state = {
    token: null, //인증 토큰 
    isOpenDropdown : false, //드롭다운 토글 상태 
    folderPath : [], //폴더 패스
    folderTree : [], //폴더 트리
    openedFolder: {},//현재 열린 폴더
    currentItem :{},//현재 선택된 아이템 
    isTrashedUpdate : true,//삭제처리 업데이트 됐는지 여부
    isStarredUpdate : true,// 중요처리 업데이트 됐는지 여부
    isUpdated: true, //업데이트 됐는지 여부(열기, 수정)
    isOpenCopyModal : false,
    isOpenMoveModal : false,
    isOpenRenameModal : false, 
    targetFolderId : '',
    fileLibrary : [],//문서, 이미지, 오디오, 비디오, zip중 선택된 파일 라이브러리   
    recentFiles:{},//최근 수정, 열어본 파일
    trashedDisk:{},//삭제된 디스크
    starredDisk:{},//중요처리 디스크
    rootFolderId: 'TBLFPKSK7E', //루트 폴더 아이디,
    dropdownPos :{} 
}

export default state;