import { que } from './card_data.js';

const STORAGE_KEY = 'quiz_system_v21_issue_reporter';

// --- 전역 설정 변수 ---
let left = true; 

// const excludeList = [
//     "배당소득 수입시기", "이자소득 이중과세 조정", "비거주자 투자소득 세율", "가능 총소득/순영업소득 정의",
//     "양도소득 신고기관", "비과세 종합저축 기준", "직장공제회 과세방법", "장기채권 분리과세 결정",
//     "주관회사 업무 제한 요건", "ELW 핵심 설명서 제공 여부", "생명보험 상품의 가격 구조", "체증식 보험의 특징",
//     "정액보험의 정의", "장기손해보험 계약 유지 조건", "저당대출지분이전증권(MPTS) 정의", "전환 증권차익거래 선호 CB",
//     "증권 분석기관의 범위", "지방채증권 투자 한도", "상속 증여와 증권거래세", "이자연계 파생결합채권",
//     "미국달러표시 채권 발행 형태", "주택 저당채권의 신용 등급", "채권과 주식의 발행주체 비교", "채권발행방식의 특징",
//     "회사내부자의 범위", "회사윤리 구성 요소", "수익상환 채권의 가치 평가", "수익률 역전 그룹이상현상",
//     "수익증권의 형태", "실물관련 펀드 수익률 변동성", "약정수익률의 정의", "지역권 승역지의 특징",
//     "자연환경 보전지역 내 물건 적치 허가 요건", "을종관리신탁의 목적", "연금저축신탁의 요건", "부동산의 장래 가치 불확실성 사유",
//     "토지 매입 시 계약 원칙", "사모투자회사(PEF) 등기 사항", "PEF 사원의 구성 및 상법 적용", "환매금지형 펀드 추가 발행 사유",
//     "PEF의 자본재조정(Recapitalization)", "스타일 투자 전략의 효과", "비금융투자상품의 예시", "전문투자기관의 예시",
//     "투자신탁 설정 시 신탁계약 변경 절차", "종류형 집합투자기구의 특징", "투자성상품의 분류", "고난도 투자성상품 대상",
//     "수익증권 발행 시 신고 의무", "교차 투자 금지 규정", "투자설명서 변경과 공시", "집합투자업자의 신탁업 겸영 금지",
//     "그랜빌 투자전략의 공황국면", "투자광고와 투자권유규제", "펀드 명칭 내 판매회사 사용 제한", "기업공개 주관 업무 예외 규정",
//     "투자정보 확인 방법",

//     // 추가 삭제 후보
//     "소득세 주소지 과세제도",
//     "1거주자 단체 과세",
//     "분류과세 대상",
//     "증권거래세 납세의무 시기",
//     "유가증권 양도소득 원천징수",
//     "증권거래세 과세 원칙",
//     "저당대출담보부채권의 특징",
//     "국내 채권유통시장의 특징",
//     "RP 매매와 자본손실 위험",
//     "주택 저당채권의 상대적 신용도",
//     "채권과 주식의 발행주체 비교",
//     "상장채권의 시장 특징",
//     "유동화전문회사(SPC)의 특징",
//     "수익환원율의 한계",
//     "채권수익률 기간 구조가설",
//     "수익률 곡선타기전략",
//     "이자율 전망과 수익률 곡선",
//     "상업지역과 주거지역의 비율 비교",
//     "담보신탁의 장점",
//     "담보신탁 담보권 실행 방법",
//     "신탁의 독립성(도산격리)",
//     "신탁 재산의 파생상품 운용 제한",
//     "신탁업자 부담 비용 항목",
//     "부동산 담보신탁의 성격",
//     "비용접근법의 유용성",
//     "부동산의 부동성과 현상",
//     "주택 외 부동산 처분 제한 기간",
//     "부동산 시장의 정보 비공개성",
//     "부동산의 인플레이션 헤지 기능",
//     "부동산과 타 자산 간 상관관계",
//     "부동산 개발금융(PF)의 특징",
//     "MBS의 정의 및 발행 구조",
//     "해외 직접 투자 양도소득세",
//     "투자일임재산의 자기발행증권 투자 금지",
//     "사모집합투자 출자방법",
//     "대안투자상품의 거래 특징",
//     "MMF의 재산평가 원칙",
//     "집합투자증권 연계 판매 가능 여부",
//     "대안투자상품의 수익 요인",
//     "환율 변동과 투자수익률의 관계",
//     "국제분산투자의 위험 관리 한계",
//     "과도한 투자권유 판단 기준",
//     "환매수수료와 회수금액 산정",
//     "기관투자자 운용조직의 특징",
//     "주식 포트폴리오 구성의 첫 단계",
//     "투자이율과 순소득승수의 관계",
//     "모자형 집합투자기구의 운용자 요건",
//     "투자매매업의 정의",
//     "금융투자업 유지 자본금 요건",
//     "집합투자업자 수시 공시사항",
//     "공모집합투자 성과보수 제한",
//     "집합투자기구 등록 자본금 조건",
//     "주식매수 선택권의 상품 분류",
//     "투자매매업의 핵심",
//     "원화표시 CD의 상품 분류",
//     "전문 투자자 투자설명서 교부 의무",
//     "금지되지 않는 집합투자재산 매수 대상",
//     "ETF 상장 기한",
//     "환매금지형 설정 기준 (시장성 없는 자산)",
//     "사모투자기구 금융위 보고 기한",
//     "집합투자재산 평가기준 마련 절차",
//     "평균투자방법의 성격",
//     "종합적 투자관리의 방식",
//     "일반투자자 전환 가능 전문투자자",
//     "특정 상품 매매 시 협회가 인정한 사전교육 의무",
//     "투자설명서 교부 거부",
//     "일반투자자 전환 가능 전문투자자 예시",
//     "투자공시 위험고지 글자 크기",
//     "핵심설명서 교부 대상 상품",
//     "주관회사 업무 수행 제한 지분율",
//     "책임보험 특징",
//     "포트폴리오 보험 투자자 특성",
//     "생명보험의 보상 원칙",
//     "예금자보험 가입 금융기관",
//     "부동산 수익 지표 구성",
//     "주식 적극적 운용방법",
//     "핵심설명서 제공대상",
//     "ELW의 시간가치와 수익원",
//     "포트폴리오 보험 전략",
//     "ABS 내부신용보강방법",
//     "기대수익률과 베타의 관계",
//     "펀드 증권 거래 회계처리",
//     "증권 특성선의 기울기 의미",
//     "증권시장선(SML)의 기울기",
//     "SML과 CML의 위치 관계",
//     "자산유동화증권(ABS) 신용도 특징",
//     "수의상환채권 특징",
//     "적극적 채권 운용전략",
//     "자기자본수익률(ROE)의 의미와 계산",
//     "ROE와 총자산수익률의 관계",
//     "평균수익률 산출 방식",
//     "시간가중수익률의 특징",
//     "연수익률 환산의 왜곡",
//     "초과수익률과 샤프지수의 관계",
//     "수익자 총회 결의 요건",
//     "투자신탁 환매 절차",
//     "수익자총회 요건",
//     "수익률 관측값 지표",
//     "증권수익률간 공분산의 의미",
//     "표시 가능 예상수익률",
//     "본국통화 수익률 분산 구성요소",
//     "도시지역의 세부 분류",
//     "국토의 계획 및 이용에 관한 법률상 용도지역 분류",
//     "부동산의 미시적 분석 항목",
//     "미국 국채 투자 시 고려사항",
//     "동일종목 투자 한도 제한",
//     "ETF 상장폐지 사유 (추적오차)"
// ];

const excludeList = ["배당소득 수입시기","이자소득 이중과세 조정","소득세 주소지 과세제도","직장공제회 과세방법","1거주자 단체 과세","장기채권 분리과세 결정","해외주식 양도차익","파생결합상품 과세","분류과세 대상","주식과 장기보유특별공제","ELW 핵심 설명서 제공 여부","책임보험 특징","체증식 보험의 특징","생명보험의 보상 원칙","정액보험의 정의","저당대출지분이전증권(MPTS) 정의","주택저당증권(MBS) 수익률 특성","전환 증권차익거래 선호 CB","펀드 증권 거래 회계처리","증권 분석기관의 범위","지급보증 전환사채 신고서 제출","채무증권의 정의","이자연계 파생결합채권","미국달러표시 채권 발행 형태","주택 저당채권의 신용 등급","주택 저당채권의 상대적 신용도","채권볼록성의 영향","채권과 주식의 발행주체 비교","채권발행방식의 특징","상장채권의 시장 특징","유동화전문회사(SPC)의 특징","회사내부자의 범위","회사윤리 구성 요소","자기자본수익률(ROE)의 의미와 계산","ROE와 총자산수익률의 관계","부동산 감정평가방식의 특징","수익상환 채권의 가치 평가","평균수익률 산출 방식","수익률 계산식","시간가중수익률의 특징","연수익률 환산의 왜곡","수익률 역전 그룹이상현상","수익자 총회 결의 요건","수익증권의 형태","주주요구수익률과 주가의 관계","증권수익률간 공분산의 의미","수익환원율의 한계","실물관련 펀드 수익률 변동성","약정수익률의 정의","수익률 곡선타기전략","이자율 전망과 수익률 곡선","지역권 승역지의 특징","자연환경 보전지역 내 물건 적치 허가 요건","신탁의 독립성(도산격리)","신탁 재산의 파생상품 운용 제한","을종관리신탁의 목적","부동산 담보신탁의 성격","비용접근법의 유용성","부동산 펀드의 금전 대여 가능성","부동산의 부동성과 현상","부동산 시장의 정보 비공개성","부동산의 장래 가치 불확실성 사유","부동산 개발금융(PF)의 특징","토지 매입 시 계약 원칙","사모투자회사(PEF) 등기 사항","대안투자상품의 거래 특징","PEF의 자본재조정(Recapitalization)","집합투자증권 연계 판매 가능 여부","대안투자상품의 수익 요인","환율 변동과 투자수익률의 관계","과도한 투자권유 판단 기준","환매수수료와 회수금액 산정","기관투자자 운용조직의 특징","스타일 투자 전략의 효과","주식 포트폴리오 구성의 첫 단계","투자이율과 순소득승수의 관계","모자형 집합투자기구의 운용자 요건","투자매매업의 정의","금융투자업 유지 자본금 요건","투자신탁 설정 시 신탁계약 변경 절차","종류형 집합투자기구의 특징","주식매수 선택권의 상품 분류","투자매매업의 핵심","원화표시 CD의 상품 분류","전문 투자자 투자설명서 교부 의무","수익증권 발행 시 신고 의무","교차 투자 금지 규정","투자설명서 변경과 공시","집합투자업자의 신탁업 겸영 금지","사모투자기구 금융위 보고 기한","집합투자재산 평가기준 마련 절차","그랜빌 투자전략의 공황국면","일반투자자 전환 가능 전문투자자","투자광고와 투자권유규제","투자설명서 교부 거부","일반투자자 전환 가능 전문투자자 예시","투자공시 위험고지 글자 크기","펀드 명칭 내 판매회사 사용 제한","기업공개 주관 업무 예외 규정","금융투자협회의 제재 권한","고객과의 거래 상대방 금지 원칙","국제분산투자 위험과 실적경쟁의 관계","외국 투자 비중과 원화 가치의 관계","투자회사 이사진 구성","단기금융 집합투자기구의 투자 대상","사모 ETF의 상장 의무 면제","종류형 집합투자기구의 정의","과세기준가격과 기준가격의 비교","종류형 집합투자기구의 보수 구조","대안투자상품의 효과","PEF 공동투자 가능 여부","PEF 무한책임사원의 권한과 투자","PEF 투자 대상 가치 조건","PEF 투자자금 회수 방식","나비형 투자전략의 특징","Break-even inflation trade 전략","국채 입찰 방식과 리스크","글로벌 매크로의 투자 접근법","Swap Spread Trades 구조","Carry Trade의 정의","Super Senior 트랜치의 신용평가","부도확률 변화와 Equity Tranche","Balance Sheet CDO와 금융비용","합성 CDO의 정의","Dynamic CDO의 특징","CDO 부도 상관관계와 델타","CDO Senior Tranche","롤링헤지의 정의","제로 베이시스 헤지","장기적 헤지 전략","환노출 관리의 대안","ADR 발행 시장","상향식 접근방식의 특징","하향식 방식의 절차","상향식 접근방법의 가정","채권의 소극적 전략과 거래비용","소극적 포트폴리오 전략의 시장관점","소극적 전략의 듀레이션 관리","재무상태표 활용 지표","CPPI 전략의 변동성 추정","부채비율과 주주 기대수익률","순자본 비율규제 주기","이자보상 비율의 의미","유동성 지표의 예시","변동비율법의 매매 전략","변동비율법과 주가 추세","재무레버리지의 정의","레버리지비율 산출","총 부채 계산식","부채-디플레이션 이론","해외부채와 이자율 관계","레버리지도와 비용의 관계","EPS 예측","선형패턴의 특징","역시계 곡선의 분류","준액티브 계량분석","할인흐름 분석법","부동산 개별분석","Stochastics의 정의","MAO 산출 방식","RSI의 개념","ROC의 정의","산업정책의 성격","산업연관표의 세로방향","생산유발계수","고용유발계수의 기준","상관계수의 산출","피구효과(Pigou Effect)","후방연쇄효과","피셔효과","델타-노말 방법의 분류","델타 헤징의 특징","ATM 스트래들 VaR","상관관계와 VaR 계산","VaR과 자원 배분","RVAR의 용도","다중요인모형의 베타","거시경제 계량모형 절차","금융소비자보호 조직","내부통제 위원회 주기","불특정 다수 세미나 이익 산정","비밀정보 확인 주체","의결공시권 대상법인","적정성원칙 대상상품","모자형 펀드의 이전 제한","펀드 투자위험 평가 수익률","펀드 성과측정 회계원칙","펀드 스타일 분석의 한계","액티브 펀드와 패시브 펀드 수익편차","헤지펀드의 투명성","헤지펀드 매니저의 CDS 거래","환매 가격기준","MMF 시가 평가 기준","MMF 가중평균 잔존만기","청약철회 효력 발생 시점","파생상품 광고 위험고지 시간","전략적 자산배분의 특징","무위험자산 포트폴리오 표시","양도의 세법상 정의","유동화 대상 자산의 조건","합성 풋 옵션전략의 성격","Kospi 지수 산출 방식","완전 복제법의 특징","최적화법의 정의","인덱스펀드 최적화법 잔차 발생","인덱스펀드 운용전략","인핸스드 인덱스펀드 비용","인헨스 인덱스 전략의 성격","인덱스펀드 정보비율","인핸스드 인덱스펀드 매입 종목","채권인덱스전략의 객관성","ESG평가 기준의 차이","ESG 기업 등급 차이 원인","ESG 발전 중심지","ESG 발전 기반","패리티지표의 정의","패리티의 의미","장외파생상품의 특징","채권 장외중개매매(IDB)의 원칙","블랙-숄츠 모형의 콜옵션 델타","옵션 민감도 지표 베가","옵션 민감도 지표 세타","포지션별 세타값","베타와 비체계적 위험","벤치마크 확정 시기","벤치마크 결정 시점","벤치마크의 가변성","기준지표의 역할","주가 선물지수 가격 변동 원인","경기확산지수의 한계","수익성지수의 의사결정","확산지수의 기준점","젠센알파와 트레이너비율 비교","젠센알파의 특성","젠센척도와 펀드매니저 능력","젠센 알파값의 독립성","정보비율 산출 방법","케인즈학파의 이자율 분석","완전구축 효과","국세 징수권 소멸시효","법인 분할 의제배당","납세의무 소멸사유","우편 신고의 효력","신임의무의 전제 조건","충실의무 성실준수 행위","충실의무의 본질","우리나라의 간접세","부가가치 유발계수 정의","ISA와 ELS","ISA 계좌 개설 제한","퇴직연금 유형별 직접투자","확정급여형 주식 투자","수익증권 임의해지","투자신탁 법정해지","투자신탁 임의해지 요건","전통적 감정평가법 NPV","차지개발방식 구조","부동산 원가방식 적용","용적률의 정의","무상증자 이벤트 전략","본국통화 투자수익률 결정요인","국제투자 환위험 요인","위험회피 투자자의 효용함수","보수적 투자자의 등효용곡선","비체계적위험","체계적 위험","국제 주식시장 회전률","이동 평균선과 분석기간","산술평균 투자수익률","이동평균선의 완만함","역사적 시뮬레이션 VAR","시장예측 능력 판정지표","맥컬레이 듀레이션 특징","신용분실분포","신용리스크 종류","불편기대가설의 가정","합리적기대학파의 주장","불편기대가설의 수익률 결정","사회적윤리와 주주가치","임직원의 대외활동 준칙","직무윤리의 형태","직무윤리 적용 범위","직무윤리의 성격과 방법","주택법상 주택 외 물건 처분","주택청약상품 혜택","주택청약 자격 제한","주택청약 전환가입","판매대리중개업자 광고권","환매 관련 정보 제공","중도상환 수수료 금지","비영업대금이익 지급일","비영업대금이익 과세","Portable Bond의 가치","무이표채 만기 보유","이표채 표면이율과 듀레이션","이표채 재투자 위험","이자변동에 따른 위험 상반","영구채 듀레이션","매도해지계약수 공식","콜옵션부 사채와 중도상환","조세감소와 IS곡선","유동성 프리미엄의 특징","멘델-토빈 효과의 성립 여부","멘델-토빈 효과의 메커니즘","통화유통속도 공식","화폐유통속도의 예측력","CAPM과 투자자의 예측","경정청구 가능 기간","청구 방법의 선택권","조합예탁금 과세","기업형 IRP의 정의","다우이론 약세시장 제2국면","시장위험의 정의","시장추출법","유통시장공시","시장질서 교란행위 처벌","신용위험과 투자성 요소","시장점유율 지표","시장분할가설의 특징","시장분할가설 정의","MSCI 한국 편입","MSCI 산출방식","MSCI지수 산출방식 키워드","T-bill 발행 형태","EV/EBITDA 의미","EV/EBITDA 비교 가능성","총 산출액 계산식","유동성리스크 사례 1","유동성리스크 사례 2","유동성리스크 정의","리스크 관리 조직 독립성","몬테카를로 평가법","몬테카를로 시뮬레이션 단점","몬테카를로 VaR 왜곡","몬테카를로 모형리스크","금융위원회 업무","금융법규 실무해석의견","금융광고 금기사항","금융기관 다수 거래와 절세","임직원 해임요구 청문 절차","금융위원회 조치 불복","금융투자협회 제재 권한","회사 직무전념의무","사업성 및 경쟁력 분석","고객의 열람 제한 사유","불공정 거래 조사결과 조치","고객의 거래 상대방 가능 여부","합병차익거래 정보","신상품 심의위원회 소집 기한","테마선택 전략 정의","테마선택 투자 요인","Nikkei225 산정 방식","사모사채 신탁재산 운용 제한","전자단기사채 관리계약 의무","전환사채 가격 조정","신주인수권사채 권리행사 효과","교환사채 정의","풋옵션부채권의 가치 변화","할인채 만기 보유 수익률","구매력위험 분산 가능성","중도상환 발생 사유","블록성과 투자자 이익","표면이율과 컨벡서티","스프레드 확대 예상 전략","스왑스프레드 거래 정의","성과평가 회계처리 시점","통합성과 측정 주의점","정규분포 수익률 데이터","표준편차의 성격","표준편차의 위험편차 성격","수익률 측정 주기","운용 목표와 척도","액티브 운용과 최적화법","패시브 운용과 최적화법","패시브 운용의 한계","동류집단의 단점","알파척도","생존계정의 오류","GIPS 수익률 계산","시간가중 수익률","정상포트폴리오","시나리오분석법","포트폴리오 위험의 수렴","분산 가능성","스타일 벤치마크 평가","효율적 프론티어","펀더멘탈 분석","지수 산출 방식","UN PRI","베어링 은행 파산 원인","protective put전략","민감도 측정치 합산 여부","사후검증의 정의","부동산의 비공개성 추세","공개시장 행위 규제","정보의 공개 규정","의결권 공시법인 요건","공시송달 사유","용도지역 및 용도지구 중복","등가교환방식","Bridge Loan의 특징","PF의 특징","자기관리 부동산 투자회사 자본금","도시관리계획의 내용","자기관리 부동산 투자회사 기한","고유재산관리 업무자 금품 제공","영업 관리자의 구비요건","물권상호간의 우선순위","지상권의 특징","건축 착공량 지표의 용이성","공부상 면적 불일치 기준","가축의 정의","금리 변동 요인","부동산 유효수요","부동산 물리적 감가요인","원가법의 적용","산업 파급효과 분석","행정지도 공개 원칙","상장주권과 최선집행의무","경영개선권고","내부자 단기 매매차익 반환제도","선행매매 불건전 영업행위","가장매매","선행매매 직무윤리","청약권유 제외 대상","전매가능성 기준","변동보고 의무","이사회 보고 의무","추가 수수료 수취","성과보장 등 표현 금지","사모집합 투자기구 총회","이의신청 처리결과 이의신청","투자 예탁금 별도 예치처","투자자 예탁금 관리 및 회사채 투자","투자자예탁금 양도 금지","이해관계인 거래 예외","국제투자 분산효과","국제 분산투자 효과","상관계수 1과 위험","통화가치와 주가 상관관계","투자신탁 주주총회 의장","현금 흐름 추정 기준","평균회수기간 효율성","주당이익과 기업실적","재산상 이익공제 한도","사적이익 추구금지 대상","볼린저밴드의 성격","저항선 상향 돌파 시 거래량","다이아몬드형 패턴","관통형 신호","삼산과 삼중천장형","VR의 특징","구조조정기간의 특징","성장기 단계","산포경향 지표","다우이론 강세시장 2국면","보통갭","역시계곡선 매입 보류 신호","호프만의 법칙","페티의 법칙","산업 전환점과 경쟁력","산업연관표의 원리","라이프사이클 분석의 한계","집중도 지수 CRk","집중률의 단점","세금 과다 납부 구제","직장공제회 초과반환금","수정신고 가능 기간","장외 증권거래 신고 기한","비거주자 종합과세 요건","비거주자 분리과세 조건","비거주자 납세의무 범위","법인격 없는 단체의 거주자 판정","해산 의제배당 수입시기","Gross-up 적용 대상","고액 상속세 포탈 제척기간","피상속인 사망 후 상속세 절세","국세 취소소송 전치주의","금융소득 수입시기","금융소득 절세 전략","우리사주조합 공모주 배정","해외선물 유지증거금","최저유지증거금 설정","금융투자업 종사자의 겸직 금지","스캘핑의 정의","목표가격 변경과 자료 공표","약관 변경 보고","유사해외 통화선물","환 위험 감소 조건","통화주의자 이론","제3자 조사분석표","표준 약관수정 보고","장래성장 잠재력의 성격","부당한 명령 거절","이해상충 취임금지","이해상충 사전 고지","이해상충 통보 의무","주의임무의 성격","합리적 근거제공","법규의 범위","기획단계 상품 언급","소속회사 사전승인","고객전용공간 분리","S&P500","FTSE지수","외국채 발행 규제","양키본드 공시의무","공격적 전략의 투자목표","가격결정 자율기능","유로채 발행 형식","T-Note","역모기지 위험","역모기지 금리 결정","연동 상품 수익률","신탁 권리 행사","위탁모집 위험부담","랩어카운트 수수료","랩어카운트 상대적 부담","워런트와 금리","워런트와 금리 변동","원금상환 속도","농수협 특화 상품","새마을금고 예금자 보호","기명식 어음","기명식 어음의 특징","저당대출 지분이전 증권","저당대출 원리금이체 채권","감마트레이딩","CDS 위험 전가 주체","CLN 수익률 구성","에스크로 계좌 인출 조건","유한책임사원(LP)의 책임","수렴형 롱숏펀드","수익률 곡선 전략","Ascending Curve","IS곡선의 기울기","구축효과","정책 무용성 정리","깁슨의 역설","경제순환주기 정의","물가와 국민소득","화폐수요 충격과 LM곡선","실질이자율의 영향","GNI의 제외 항목","GNI의 정의"];

let quizStack = [...que];
let currentIdx = 0;
let correctCount = 0;
let totalAttempts = 0;
let animating = false;
let wrongCounts = {}; 
let issueSet = new Set(); 

const stage = document.getElementById('stage');
const progressBar = document.getElementById('progressBar');
const counter = document.getElementById('counter');
const correctDisplay = document.getElementById('correctCount');

// --- 추가된 로직: 실제 렌더링될 문제 수 계산 ---
function getVisibleTotal() {
    if (!left) return que.length;
    // excludeList에 포함되지 않은 문항만 카운트
    return que.filter(item => !excludeList.includes(item.main)).length;
}

// --- 1. 데이터 저장 및 로드 ---
function saveProgress() {
    const data = { quizStack, currentIdx, correctCount, totalAttempts, wrongCounts };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
        const data = JSON.parse(saved);
        correctCount = data.correctCount || 0;
        totalAttempts = data.totalAttempts || 0;
        wrongCounts = data.wrongCounts || {};
        const savedStack = (data.quizStack || []).filter(item => item !== null);
        const sIdx = data.currentIdx || 0;
        const remaining = savedStack.slice(sIdx);
        if (remaining.length > 0) {
            const nowCard = remaining[0]; 
            const others = remaining.slice(1); 
            const wrongItems = [];
            const normalItems = [];
            const passedMains = new Set(savedStack.slice(0, sIdx).filter(m => m && m.main).map(m => m.main));
            others.forEach(item => {
                if (item && item.main && passedMains.has(item.main)) { wrongItems.push(item); } 
                else if (item) { normalItems.push(item); }
            });
            quizStack = [...wrongItems, nowCard, ...normalItems].filter(q => q !== undefined);
        }
        currentIdx = 0;
    } catch (e) {
        console.error("로드 오류:", e);
        localStorage.removeItem(STORAGE_KEY);
    }
}

// --- 2. 보기 생성 엔진 ---
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getRandomDistractors(excludeArray, count) {
    const allAnswers = que.flatMap(item => (Array.isArray(item.answer) ? item.answer : [item.answer]));
    const uniquePool = [...new Set(allAnswers.filter(ans => !excludeArray.includes(ans)))];
    return shuffle(uniquePool).slice(0, count);
}

function prepareChoices(q) {
    if (q.fixedChoices) return;
    if (Array.isArray(q.answer)) q.answer = q.answer.map(a => String(a));
    if (q.type === 'ox') {
        q.fixedChoices = ['O', 'X'];
        q.fixedAnswers = [q.answer];
    } else {
        const originalAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
        let selectedAnswers = originalAnswers.length >= 5 ? shuffle([...originalAnswers]).slice(0, 5) : [...originalAnswers];
        const neededDistractors = 5 - selectedAnswers.length;
        const distractors = neededDistractors > 0 ? getRandomDistractors(originalAnswers, neededDistractors) : [];
        q.fixedChoices = shuffle([...selectedAnswers, ...distractors]);
        q.fixedAnswers = selectedAnswers;
    }
}

// --- 3. 렌더링 엔진 ---
function renderNextCard() {
    updateUI();
    if (!stage) return;
    stage.innerHTML = '';
    animating = false;

    if (currentIdx >= quizStack.length) { showDone(); return; }

    const q = quizStack[currentIdx];

    // [필터링 로직]
    if (left && excludeList.includes(q.main)) {
        currentIdx++;
        renderNextCard(); 
        return;
    }

    prepareChoices(q);

    const card = document.createElement('div');
    card.className = 'card active';

    // 상단 바 (클로버, 이슈체크)
    const topBar = document.createElement('div');
    topBar.style.display = 'flex';
    topBar.style.justifyContent = 'space-between';
    topBar.style.alignItems = 'center';
    topBar.style.marginBottom = '10px';

    const cloverContainer = document.createElement('div');
    const wCount = wrongCounts[q.main] || 0;
    for (let i = 0; i < wCount; i++) {
        const clover = document.createElement('span');
        clover.textContent = '♣';
        clover.style.fontSize = '10px';
        clover.style.color = '#ff4b2b';
        clover.style.marginRight = '2px';
        cloverContainer.appendChild(clover);
    }

    const issueLabel = document.createElement('label');
    issueLabel.style.fontSize = '12px';
    issueLabel.style.color = '#888';
    issueLabel.style.cursor = 'pointer';
    issueLabel.innerHTML = `<input type="checkbox" id="issueChk" style="display:none;">`;
    const chk = issueLabel.querySelector('input');
    if (issueSet.has(q)) chk.checked = true;
    chk.onchange = (e) => {
        e.stopPropagation();
        if (chk.checked) issueSet.add(q);
        else issueSet.delete(q);
    };

    topBar.appendChild(cloverContainer);
    topBar.appendChild(issueLabel);
    card.appendChild(topBar);

    if (q.type === 'ox') {
        card.insertAdjacentHTML('beforeend', `
            <div class="card-label">OX QUIZ</div>
            <div class="card-main">${q.main}</div>
            <div class="card-divider"></div>
            <div class="card-sentence" style="margin-bottom:20px; font-size:18px;">${q.sentence}</div>
            <div class="choices" style="display:flex; flex-direction: row; gap: 15px;">
                ${q.fixedChoices.map(c => `<button class="choice-btn ox-btn" style="flex:1; height:80px; font-size:24px;">${c}</button>`).join('')}
            </div>
            <div class="result-badge"></div>`);
        card.querySelectorAll('.ox-btn').forEach(btn => {
            btn.onclick = (e) => { 
                e.stopPropagation();
                if (!animating) handleResult(btn.textContent === q.answer, q, [q.answer], [btn.textContent]); 
            };
        });
    } else {
        const choicesHtml = q.fixedChoices.map(c => `<button class="choice-btn multi-btn">${c}</button>`).join('');
        if (q.type === 'blank') {
            let realAnswersInOrder = [];
            const pattern = new RegExp(`(${q.fixedAnswers.map(s => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')})`, 'g');
            const processedSentence = q.sentence.replace(pattern, (match) => { realAnswersInOrder.push(match); return `<span class="hole">____</span>`; });
            card.insertAdjacentHTML('beforeend', `
                <div class="card-label">FILL IN THE BLANK</div>
                <div class="sentence-area" style="line-height:2.5; font-size:18px; margin-bottom:20px;">${processedSentence}</div>
                <div class="choices">${choicesHtml}</div>
                <button class="submit-btn" id="submitBtn" style="margin-top:15px; width:100%;">정답 제출</button>
                <div class="result-badge"></div>`);
            setupBlankLogic(card, realAnswersInOrder, q);
        } else {
            card.insertAdjacentHTML('beforeend', `
                <div class="card-label">MULTI-SELECT</div>
                <div class="card-main">${q.main}</div>
                <div class="card-divider"></div>
                <div class="choices">${choicesHtml}</div>
                <button class="submit-btn" id="submitBtn" style="margin-top:15px; width:100%;">답안 제출</button>
                <div class="result-badge"></div>`);
            setupMultiSelectLogic(card, q.fixedAnswers, q);
        }
    }
    stage.appendChild(card);
}

// --- 4. 인터랙션 로직 ---
function setupBlankLogic(card, realAnswersInOrder, questionData) {
    const multiBtns = card.querySelectorAll('.multi-btn');
    const holes = card.querySelectorAll('.hole');
    const submitBtn = card.querySelector('#submitBtn');
    let selectedTexts = new Array(holes.length).fill(null);
    multiBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation(); if (animating) return;
            const emptyIdx = selectedTexts.indexOf(null);
            if (emptyIdx !== -1) {
                selectedTexts[emptyIdx] = btn.textContent;
                holes[emptyIdx].textContent = btn.textContent;
                holes[emptyIdx].style.color = "var(--accent)";
            }
        };
    });
    holes.forEach((hole, idx) => {
        hole.onclick = (e) => {
            e.stopPropagation(); if (animating) return;
            selectedTexts[idx] = null; hole.textContent = "____"; hole.style.color = "#ccc";
        };
    });
    submitBtn.onclick = (e) => {
        e.stopPropagation(); if (animating || selectedTexts.includes(null)) return;
        const isCorrect = selectedTexts.every((val, idx) => val === realAnswersInOrder[idx]);
        handleResult(isCorrect, questionData, realAnswersInOrder, selectedTexts);
    };
}

function setupMultiSelectLogic(card, correctList, questionData) {
    const multiBtns = card.querySelectorAll('.multi-btn');
    const submitBtn = card.querySelector('#submitBtn');
    let selectedTexts = [];
    multiBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation(); if (animating) return;
            btn.classList.toggle('selected');
            const txt = btn.textContent;
            if (btn.classList.contains('selected')) selectedTexts.push(txt);
            else selectedTexts = selectedTexts.filter(t => t !== txt);
        };
    });
    submitBtn.onclick = (e) => {
        e.stopPropagation(); if (animating || selectedTexts.length === 0) return;
        const isCorrect = JSON.stringify([...selectedTexts].sort()) === JSON.stringify([...correctList].sort());
        handleResult(isCorrect, questionData, correctList, selectedTexts);
    };
}

// --- 5. 결과 처리 ---
function handleResult(isSuccess, questionData, correctToHighlight, userSelections = []) {
    animating = true;
    totalAttempts++;
    const card = stage.querySelector('.card');
    const badge = card.querySelector('.result-badge');
    const allBtns = card.querySelectorAll('.choice-btn, .multi-btn, #submitBtn');
    
    allBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
        if (correctToHighlight.includes(btn.textContent)) btn.classList.add('correct');
        else if (userSelections.includes(btn.textContent)) btn.classList.add('wrong');
    });

    if (!isSuccess && questionData.type === 'blank') {
        const holes = card.querySelectorAll('.hole');
        holes.forEach((hole, idx) => {
            hole.textContent = correctToHighlight[idx];
            hole.style.color = "#4CAF50"; hole.style.borderBottom = "2px solid #4CAF50";
        });
    }

    badge.className += ' show';
    setTimeout(() => badge.classList.remove('show'), 500);

    if (isSuccess) {
        correctCount++;
        badge.textContent = '⭕';
        setTimeout(() => {
            card.classList.add('fly-away');
            setTimeout(proceedToNext, 600);
        }, 400);
    } else {
        wrongCounts[questionData.main] = (wrongCounts[questionData.main] || 0) + 1;
        quizStack.push(questionData);
        badge.textContent = '❌';
        const guide = document.createElement('div');
        guide.innerHTML = "화면을 터치하여 계속하기";
        guide.style.cssText = "font-size:12px; color:#ff4b2b; margin-top:15px; text-align:center; font-weight:bold;";
        card.appendChild(guide);
        card.style.cursor = 'pointer';
        card.onclick = () => {
            card.onclick = null;
            card.classList.add('drop-away');
            setTimeout(proceedToNext, 600);
        };
    }

    function proceedToNext() {
        currentIdx++;
        saveProgress();
        renderNextCard();
    }
}

// --- [수정된 부분] 실제 보여지는 문제 수 기준으로 UI 업데이트 ---
function updateUI() {
    if (!progressBar || !counter) return;
    const totalVisible = getVisibleTotal(); // 필터링된 전체 개수
    const progress = Math.min((correctCount / totalVisible) * 100, 100);
    progressBar.style.width = `${progress}%`;
    counter.textContent = `${correctCount} / ${totalVisible}`;
    if (correctDisplay) correctDisplay.textContent = correctCount;
}

// --- 6. 종료 화면 ---
function showDone() {
    stage.style.display = 'none';
    const doneScreen = document.getElementById('doneScreen');
    const doneTitle = document.getElementById('doneTitle');
    if (doneScreen && doneTitle) {
        doneScreen.classList.add('visible');
        if (issueSet.size > 0) {
            const issueData = Array.from(issueSet).map(item => {
                const { fixedChoices, fixedAnswers, ...cleanItem } = item;
                return cleanItem;
            });
            const reporterArea = document.createElement('div');
            reporterArea.style.marginTop = '20px';
            reporterArea.innerHTML = `
                <p style="font-size:14px; color:#ff4b2b;">⚠️ 체크된 이슈 문제 데이터 (${issueSet.size}건)</p>
                <textarea readonly style="width:100%; height:150px; padding:10px; font-family:monospace; font-size:12px; border:1px solid #ddd; border-radius:5px; background:#f9f9f9;">${JSON.stringify(issueData, null, 2)}</textarea>
                <button onclick="copyIssueData(this)" style="margin-top:10px; width:100%; padding:10px; background:#444; color:#fff; border:none; border-radius:5px; cursor:pointer;">데이터 복사하기</button>
            `;
            doneTitle.after(reporterArea);
        }
    }
}

window.copyIssueData = (btn) => {
    const txt = btn.previousElementSibling;
    txt.select();
    document.execCommand('copy');
    btn.textContent = "복사 완료!";
    setTimeout(() => btn.textContent = "데이터 복사하기", 2000);
};

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderNextCard();
    document.getElementById('resetBtn').onclick = () => {
        if (confirm("기록을 초기화하시겠습니까?")) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    };
});

window.restart = () => { localStorage.removeItem(STORAGE_KEY); location.reload(); };