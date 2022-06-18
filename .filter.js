// 비속어 리스트
var word_list_1 = ['ㅅㅂ','ㅆㅂ','ㅂㅅ', 'ㄲㅈ', 'ㄱㅅㄲ', 'ㄱㅅㄱ', 'ㅆ', 'ㅈㄲ', 'ㅈㄱ','ㅈㄹ','ㄱㅈㄹ', 'ㅈㄴ', 'ㅁㅊ', 'ㅁㅊㄴ', 'ㄱㄹ', 'ㅅㅂㄹ', 'ㅅㅂㄴ','ㅗ'];
var word_list_2 = ['시발', '씨발', '병신', '꺼져', '개새끼', '개새기', '썅', '좆까', '조까', '좆가', '지랄', '개지랄', '존나', '미친', '미친년', '미친놈', '구라', '바보', '멍청이', '시발련' ,'시발놈', '시발년', '시발눔', '시발뇬' ,'시발념', '씨발련' ,'씨발놈', '씨발년', '씨발눔', '씨발뇬' ,'씨발념'];
var word_list_3 = ['tq', 'Tq', 'TQ', 'tQ', 'qt', 'QT', 'Rw', 'rtR', 'rtr', 'T', 'wR', 'wr', 'wf', 'rwf', 'ws', 'ac', 'acs', 'rf', 'tqf', 'tqs', 'h'];
var word_list_4 = ['fuck', 'fucking', 'tlqkf', 'qudtls', 'rjwu', 'tororl', 'tid', 'whrk', 'whwrk', 'wlfkf', 'rowlfkf', 'whssk', 'whffk', 'alcls', 'alclssus', 'sus', 'alclssha', 'rnfk', 'qkqh', 'ajdcjddl', 'tlqkffus', 'tlqkfsha', 'tlqkfsus', 'tlqkfsna', 'tlqkfsys', 'tlqkfsua'];

// 모음, 자음 리스트
var word_list_ko_1 = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ',];
var word_list_ko_2 = ['ㄳ', 'ㄵ','ㄶ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅄ'];
var word_list_ko_3 = ['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ'];
var word_list_ko_4 = ['ㅘ', 'ㅚ','ㅙ','ㅝ','ㅟ','ㅞ','ㅢ'];

// 영어 리스트
var word_list_en_1 = ['A', 'B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// 비속어 필터링
function delContent(content){
    console.log('필터링 시작' + content);

    var strArray = content.split(' ');
    var filterArray = strArray;
    var index = 0;
    var filter_str = '';
    
    strArray.forEach(str => {
        word_list_1.forEach(element => {
            if(str.includes(element)){
                filterArray[index] = "";
                let i;
                for(i = 0; i < element.length; i++){
                    filterArray[index] += '\❤';
                }
                if(str[i] !== undefined)
                    filterArray[index] += str[i];
            }
        });
        index++;
    });

    index = 0;

    strArray.forEach(str => {
        word_list_2.forEach(element => {
            if(str.includes(element)){
                filterArray[index] = "";
                let i;
                for(i = 0; i < element.length; i++){
                    filterArray[index] += '\❤';
                }
                if(str[i] !== undefined)
                    filterArray[index] += str[i];
            }
        });
        index++;
    });

    index = 0;

    strArray.forEach(str => {
        word_list_3.forEach(element => {
            if(str.toLowerCase().includes(element)){
                filterArray[index] = "";
                let i;
                for(i = 0; i < element.length; i++){
                    filterArray[index] += '\❤';
                }
                if(str[i] !== undefined)
                    filterArray[index] += str[i];
            }
        });
        index++;
    });

    index = 0;

    strArray.forEach(str => {
        word_list_4.forEach(element => {
            if(str.toLowerCase().includes(element)){
                filterArray[index] = "";
                let i;
                for(i = 0; i < element.length; i++){
                    filterArray[index] += '\❤';
                }
                if(str[i] !== undefined)
                    filterArray[index] += str[i];
            }
        });
        index++;
    });

    filter_str = filterArray.join(' ');

    return filter_str;
}

// 따옴표 제거
function delQuotes(content){
    content = content.replace(/'/g, "");
    content = content.replace(/"/g, "");

    return content;
}

// 자음이 연속적으로 5개 이상 나올 때
// 겹자음/모음/겹모음이 하나씩 나올 때
function warningWord(content){

    let split = Array.from(content);
    console.log(split);

    var count = 0;
    split.forEach(sp => {
        word_list_ko_1.forEach(element => {
            if(sp.includes(element)){
                count++;
            }
        });
    });

    if(count >= 5)
        return "자음 5개 초과";

    var count4 = 0;
    var count5 = 0;
    var count6 = 0;
    split.forEach(sp => {
        word_list_ko_2.forEach(element => {
            if(sp.includes(element))
                count4++;
        });
        word_list_ko_3.forEach(element => {
            if(sp.includes(element))
                count5++;
        });
        word_list_ko_4.forEach(element => {
            if(sp.includes(element))
                count6++;
        });
    });

    if(count4 >= 1)
        return "겹자음 1개 초과";

    if(count5 >= 6)
        return "모음 5개 초과";

    if(count6 >= 1)
        return "겹모음 1개 초과";

    var count7 = 0;
    split.forEach(sp => {
        word_list_en_1.forEach(element => {
            if(sp.toUpperCase().includes(element)){
                count7++;
            }
        });
    });
    if(count7 >= 6)
        return "영어 5개 초과";

    return undefined;
}

// 빈칸 체크
function checkBlank(content){
    if(content === undefined){
        return '내용을 입력해주세요';
    }

    return true;
}

exports.filter_func = {
    delContent,
    delQuotes,
    warningWord,
    checkBlank
}