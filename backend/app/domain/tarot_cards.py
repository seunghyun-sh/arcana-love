"""타로 카드 도메인 데이터 — 메이저 아르카나 22장 + 마이너 아르카나 56장.

프론트엔드의 src/data/tarotCards.ts 와 동기화되어 있습니다.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class TarotCard:
    id: int
    slug: str
    english_name: str
    korean_name: str
    upright_meaning: str
    reversed_meaning: str
    love_meanings: dict[str, str]  # keys: self, other, flow
    tone: str  # positive | neutral | challenging
    keywords: list[str] = field(default_factory=list)


MAJOR_ARCANA: list[TarotCard] = [
    TarotCard(
        id=0,
        slug="the-fool",
        english_name="The Fool",
        korean_name="바보",
        upright_meaning="새로운 시작, 즉흥성, 순수한 끌림",
        reversed_meaning="충동, 미성숙, 방향 상실",
        love_meanings={
            "self": "당신은 아직 이 관계를 정의하기보다 설렘의 가능성을 탐색하고 싶어 합니다.",
            "other": "상대는 분명 호감이 있지만 무게를 싣기보다 가볍게 흐르길 원하는 기색이 있습니다.",
            "flow": "관계는 빠르게 가까워질 수 있지만 기준 없는 속도는 금세 불안으로 번질 수 있습니다.",
        },
        tone="neutral",
        keywords=["fresh", "curious", "risk"],
    ),
    TarotCard(
        id=1,
        slug="the-magician",
        english_name="The Magician",
        korean_name="마법사",
        upright_meaning="의지, 표현력, 끌어당기는 힘",
        reversed_meaning="계산, 과장, 진정성 부족",
        love_meanings={
            "self": "당신은 이 관계를 그냥 두지 않고 직접 움직여 보고 싶은 마음이 강합니다.",
            "other": "상대 역시 당신의 매력을 인식하고 있으며 분명한 반응을 보일 수 있는 상태입니다.",
            "flow": "작은 행동 하나가 관계의 분위기를 바꿀 만큼, 지금은 신호가 잘 먹히는 시기입니다.",
        },
        tone="positive",
        keywords=["spark", "initiative", "chemistry"],
    ),
    TarotCard(
        id=2,
        slug="the-high-priestess",
        english_name="The High Priestess",
        korean_name="여교황",
        upright_meaning="직관, 침묵, 감춰진 진심",
        reversed_meaning="혼란, 비밀, 감정 차단",
        love_meanings={
            "self": "당신은 감정을 쉽게 드러내지 않지만 이미 깊은 직감으로 상대를 읽고 있습니다.",
            "other": "상대는 생각이 많고 감정을 숨기는 편이라 표현보다 침묵으로 마음을 남길 가능성이 큽니다.",
            "flow": "관계는 천천히 깊어질 수 있으나, 분명한 고백보다는 미묘한 분위기와 눈치가 먼저 흐릅니다.",
        },
        tone="neutral",
        keywords=["intuition", "mystery", "silence"],
    ),
    TarotCard(
        id=3,
        slug="the-empress",
        english_name="The Empress",
        korean_name="황후",
        upright_meaning="풍요, 애정 표현, 다정한 안정감",
        reversed_meaning="과잉 기대, 집착, 감정 소진",
        love_meanings={
            "self": "당신은 사랑을 줄 준비가 되어 있고, 관계를 따뜻하게 키우고 싶은 욕구가 분명합니다.",
            "other": "상대는 당신에게 편안함과 매력을 느끼며 더 가까워지고 싶은 마음을 품고 있습니다.",
            "flow": "관계는 정서적 안정과 애정 표현이 쌓일수록 아름답게 자라나는 흐름입니다.",
        },
        tone="positive",
        keywords=["warmth", "abundance", "care"],
    ),
    TarotCard(
        id=4,
        slug="the-emperor",
        english_name="The Emperor",
        korean_name="황제",
        upright_meaning="안정, 기준, 책임감",
        reversed_meaning="통제, 완고함, 거리감",
        love_meanings={
            "self": "당신은 이 관계를 가볍게 소비하기보다 확실한 기준 안에서 보고 싶어 합니다.",
            "other": "상대는 감정이 있어도 쉽게 흔들리지 않으며, 상황을 통제 가능한 범위에서 다루려 합니다.",
            "flow": "관계는 분명한 태도와 책임 있는 행동이 생길 때 비로소 안정적인 진전을 만듭니다.",
        },
        tone="neutral",
        keywords=["structure", "boundaries", "serious"],
    ),
    TarotCard(
        id=5,
        slug="the-hierophant",
        english_name="The Hierophant",
        korean_name="교황",
        upright_meaning="전통, 약속, 공식화",
        reversed_meaning="틀에 갇힘, 관성, 고정관념",
        love_meanings={
            "self": "당신은 감정뿐 아니라 관계의 이름과 방향을 분명히 하고 싶어 합니다.",
            "other": "상대도 가벼운 스쳐 감보다 오래 갈 수 있는 안정된 연결을 의식하고 있습니다.",
            "flow": "관계는 대화와 합의를 통해 자연스럽게 공식적인 형태로 발전할 가능성이 있습니다.",
        },
        tone="positive",
        keywords=["commitment", "trust", "clarity"],
    ),
    TarotCard(
        id=6,
        slug="the-lovers",
        english_name="The Lovers",
        korean_name="연인",
        upright_meaning="상호 끌림, 선택, 진실한 연결",
        reversed_meaning="갈등, 엇갈림, 선택 회피",
        love_meanings={
            "self": "당신의 마음은 이미 강하게 기울어 있으며 이 감정을 진짜 관계로 이어 보고 싶어 합니다.",
            "other": "상대 또한 당신과의 연결을 가볍게 여기지 않고 감정적 선택지로 보고 있습니다.",
            "flow": "관계는 서로의 진심을 확인할수록 급격히 가까워질 수 있는 강한 공명대를 품고 있습니다.",
        },
        tone="positive",
        keywords=["union", "choice", "magnetism"],
    ),
    TarotCard(
        id=7,
        slug="the-chariot",
        english_name="The Chariot",
        korean_name="전차",
        upright_meaning="추진력, 돌파, 의지의 집중",
        reversed_meaning="과속, 충돌, 조급함",
        love_meanings={
            "self": "당신은 더 이상 기다리기보다 지금 상황을 밀고 나가고 싶은 마음이 큽니다.",
            "other": "상대는 감정이 생기면 빠르게 움직일 수 있지만, 동시에 자신의 리듬을 놓치고 싶어 하지는 않습니다.",
            "flow": "관계는 방향만 맞으면 빠르게 진전되지만 서로의 속도가 다르면 긴장도 함께 커집니다.",
        },
        tone="positive",
        keywords=["momentum", "drive", "timing"],
    ),
    TarotCard(
        id=8,
        slug="strength",
        english_name="Strength",
        korean_name="힘",
        upright_meaning="인내, 부드러운 용기, 신뢰",
        reversed_meaning="불안, 자기 의심, 감정 폭발",
        love_meanings={
            "self": "당신은 흔들리는 감정 속에서도 성숙하게 관계를 다루고 싶어 합니다.",
            "other": "상대는 당신에게 안정감을 느끼며 서서히 마음을 열 가능성이 높습니다.",
            "flow": "관계는 강한 자극보다 차분한 신뢰가 쌓일수록 더 단단해지는 흐름입니다.",
        },
        tone="positive",
        keywords=["patience", "trust", "soft-power"],
    ),
    TarotCard(
        id=9,
        slug="the-hermit",
        english_name="The Hermit",
        korean_name="은둔자",
        upright_meaning="거리 두기, 성찰, 조용한 관찰",
        reversed_meaning="고립, 단절, 지나친 회피",
        love_meanings={
            "self": "당신은 감정보다 먼저 스스로의 확신을 찾고 싶어 하며, 쉽게 다가가지 못하고 있습니다.",
            "other": "상대는 마음이 없어서라기보다 지금 자기 안의 생각과 상황에 더 잠겨 있을 수 있습니다.",
            "flow": "관계는 당장 뜨겁게 번지기보다 시간과 여백 속에서 의미를 확인해야 하는 흐름입니다.",
        },
        tone="challenging",
        keywords=["distance", "reflection", "pause"],
    ),
    TarotCard(
        id=10,
        slug="wheel-of-fortune",
        english_name="Wheel of Fortune",
        korean_name="운명의 수레바퀴",
        upright_meaning="전환점, 운의 흐름, 예기치 않은 변화",
        reversed_meaning="반복, 엇박자, 타이밍 손실",
        love_meanings={
            "self": "당신은 이 관계가 우연을 넘어 운명처럼 움직이길 기대하고 있습니다.",
            "other": "상대 역시 당신과의 연결에서 이전과 다른 감정의 변화를 느끼고 있을 수 있습니다.",
            "flow": "관계는 뜻밖의 계기 하나로 분위기가 바뀌며, 타이밍을 잡으면 큰 전환이 가능합니다.",
        },
        tone="positive",
        keywords=["fate", "change", "turning-point"],
    ),
    TarotCard(
        id=11,
        slug="justice",
        english_name="Justice",
        korean_name="정의",
        upright_meaning="균형, 진실, 분명한 판단",
        reversed_meaning="불균형, 회피, 억울함",
        love_meanings={
            "self": "당신은 감정에만 휩쓸리기보다 상황을 냉정하게 보고 싶어 합니다.",
            "other": "상대는 마음이 있어도 쉽게 표현하지 않고, 먼저 관계의 현실성을 재고 있을 수 있습니다.",
            "flow": "관계는 감정보다 사실과 태도의 일관성이 중요하며, 모호함을 정리할수록 선명해집니다.",
        },
        tone="neutral",
        keywords=["truth", "balance", "clarity"],
    ),
    TarotCard(
        id=12,
        slug="the-hanged-man",
        english_name="The Hanged Man",
        korean_name="매달린 사람",
        upright_meaning="멈춤, 관점 전환, 보류",
        reversed_meaning="지연, 정체, 희생의 피로",
        love_meanings={
            "self": "당신은 이 관계를 붙잡고 싶지만 지금은 적극적으로 움직이기보다 상황을 지켜보는 중입니다.",
            "other": "상대는 감정이 없기보다 아직 결정을 미루고 있으며 마음을 정리할 시간이 더 필요합니다.",
            "flow": "관계는 당장 답이 나오기보다 정체된 듯 보이는 시간을 지나며 의미가 드러나는 흐름입니다.",
        },
        tone="challenging",
        keywords=["suspension", "delay", "shift"],
    ),
    TarotCard(
        id=13,
        slug="death",
        english_name="Death",
        korean_name="죽음",
        upright_meaning="끝과 시작, 단절 후 재편, 강한 변화",
        reversed_meaning="미련, 끝맺지 못함, 변화 저항",
        love_meanings={
            "self": "당신은 이전 방식으로는 이 관계가 유지될 수 없다는 사실을 이미 감지하고 있습니다.",
            "other": "상대도 마음의 국면이 바뀌는 중이며, 예전처럼 돌아가기보다 새로운 방식이 필요합니다.",
            "flow": "관계는 큰 전환을 요구하며, 낡은 패턴을 끝내야만 다음 가능성이 열립니다.",
        },
        tone="challenging",
        keywords=["transformation", "release", "ending"],
    ),
    TarotCard(
        id=14,
        slug="temperance",
        english_name="Temperance",
        korean_name="절제",
        upright_meaning="조화, 회복, 균형 잡힌 교류",
        reversed_meaning="엇박자, 감정 과잉, 인내 부족",
        love_meanings={
            "self": "당신은 감정을 급하게 밀어붙이기보다 아름답게 균형을 맞추고 싶어 합니다.",
            "other": "상대는 천천히지만 꾸준하게 마음을 맞춰 갈 수 있는 사람입니다.",
            "flow": "관계는 서두르지 않을수록 오히려 깊어지며, 자연스러운 페이스가 최고의 해답이 됩니다.",
        },
        tone="positive",
        keywords=["healing", "balance", "harmony"],
    ),
    TarotCard(
        id=15,
        slug="the-devil",
        english_name="The Devil",
        korean_name="악마",
        upright_meaning="집착, 강한 유혹, 놓기 어려운 끌림",
        reversed_meaning="해방, 중독 끊기, 패턴 인식",
        love_meanings={
            "self": "당신은 이 관계에 강하게 끌리지만 동시에 감정적으로 묶여 있는 부분도 느끼고 있습니다.",
            "other": "상대 역시 강한 호기심이나 욕망을 느낄 수 있으나 건강한 방식으로 표현하지 못할 수 있습니다.",
            "flow": "관계는 강렬하지만 불균형해지기 쉬워, 서로를 소모시키는 패턴을 경계해야 합니다.",
        },
        tone="challenging",
        keywords=["temptation", "obsession", "intensity"],
    ),
    TarotCard(
        id=16,
        slug="the-tower",
        english_name="The Tower",
        korean_name="탑",
        upright_meaning="급격한 진실, 붕괴, 예기치 않은 충격",
        reversed_meaning="위기 회피, 금 간 구조, 후폭풍",
        love_meanings={
            "self": "당신은 겉으로 버티고 있어도 내면에서는 이 관계의 불안정함을 강하게 느끼고 있습니다.",
            "other": "상대는 감정을 숨기고 있었더라도 갑작스럽게 태도를 바꾸거나 진실을 드러낼 수 있습니다.",
            "flow": "관계는 기존의 애매한 구조가 깨지면서 진짜 본심과 현실을 마주하게 되는 흐름입니다.",
        },
        tone="challenging",
        keywords=["shock", "truth", "breakthrough"],
    ),
    TarotCard(
        id=17,
        slug="the-star",
        english_name="The Star",
        korean_name="별",
        upright_meaning="희망, 치유, 맑은 진심",
        reversed_meaning="불신, 낙담, 기대 저하",
        love_meanings={
            "self": "당신은 여전히 이 관계 안에서 희망과 아름다움을 보고 있습니다.",
            "other": "상대는 당신을 보며 마음이 편안해지고, 감정을 더 건강하게 바라보게 될 수 있습니다.",
            "flow": "관계는 치유와 회복의 결을 타며, 서서히 신뢰를 다시 밝히는 방향으로 움직입니다.",
        },
        tone="positive",
        keywords=["hope", "healing", "gentle"],
    ),
    TarotCard(
        id=18,
        slug="the-moon",
        english_name="The Moon",
        korean_name="달",
        upright_meaning="불확실성, 감정의 파도, 숨은 불안",
        reversed_meaning="혼란 정리, 진실 노출, 두려움 완화",
        love_meanings={
            "self": "당신은 직감적으로 끌리지만 동시에 상대의 진심을 확신하지 못해 흔들리고 있습니다.",
            "other": "상대는 감정이 있어도 혼란과 두려움 때문에 분명한 신호를 주지 못할 수 있습니다.",
            "flow": "관계는 감정의 밀물과 썰물이 커서, 지금은 해석보다 현실 확인이 더 중요합니다.",
        },
        tone="challenging",
        keywords=["uncertainty", "dream", "fear"],
    ),
    TarotCard(
        id=19,
        slug="the-sun",
        english_name="The Sun",
        korean_name="태양",
        upright_meaning="기쁨, 선명함, 드러나는 호감",
        reversed_meaning="과열, 자의식, 기대 과다",
        love_meanings={
            "self": "당신의 마음은 매우 솔직하고, 사랑을 숨기기보다 밝게 표현하고 싶어 합니다.",
            "other": "상대는 당신과 있을 때 감정이 맑아지고 즐거움을 분명하게 느낄 가능성이 큽니다.",
            "flow": "관계는 오해보다 확신이 커지며, 자연스럽고 건강한 방식으로 가까워질 수 있습니다.",
        },
        tone="positive",
        keywords=["joy", "clarity", "warmth"],
    ),
    TarotCard(
        id=20,
        slug="judgement",
        english_name="Judgement",
        korean_name="심판",
        upright_meaning="각성, 재평가, 다시 부름",
        reversed_meaning="미련, 후회, 과거 회피",
        love_meanings={
            "self": "당신은 이 관계를 통해 자신의 진짜 감정과 원하는 사랑의 형태를 다시 깨닫고 있습니다.",
            "other": "상대 역시 지나간 감정이나 선택을 다시 돌아보며 새로운 판단을 내릴 수 있습니다.",
            "flow": "관계는 과거의 패턴을 재정리한 뒤, 다시 연결되거나 전혀 다른 결론으로 나아갈 수 있습니다.",
        },
        tone="positive",
        keywords=["awakening", "return", "reckoning"],
    ),
    TarotCard(
        id=21,
        slug="the-world",
        english_name="The World",
        korean_name="세계",
        upright_meaning="완성, 성숙한 결실, 조화로운 마무리",
        reversed_meaning="미완성, 마지막 한 걸음 부족, 반복",
        love_meanings={
            "self": "당신은 단순한 설렘보다 완성도 있는 관계를 원하며, 이제 그 기준이 분명해졌습니다.",
            "other": "상대는 당신과의 관계에서 안정감과 장기적인 가능성을 동시에 볼 수 있습니다.",
            "flow": "관계는 자연스럽게 다음 단계로 이어지며, 서로에게 맞는 리듬을 찾을 가능성이 높습니다.",
        },
        tone="positive",
        keywords=["completion", "maturity", "fulfillment"],
    ),
]


# ──────────────────────────────────────────────────────────────
# 마이너 아르카나 (56장)
# ──────────────────────────────────────────────────────────────

MINOR_ARCANA: list[TarotCard] = [
    # ═══════════════════════════════════════
    #  Wands (완드 / 지팡이) — 열정·에너지·행동
    # ═══════════════════════════════════════
    TarotCard(
        id=100, slug="ace-of-wands",
        english_name="Ace of Wands", korean_name="완드 에이스",
        upright_meaning="새로운 열정, 불꽃 같은 시작, 강렬한 끌림",
        reversed_meaning="동력 상실, 시작만 반복, 방향 없는 열기",
        love_meanings={
            "self": "당신 안에 새로운 사람(또는 새로운 감정)을 향한 불꽃이 막 피어오르고 있습니다.",
            "other": "상대 역시 당신에게 흥미를 느끼기 시작한 초기 단계이며 에너지가 살아 있습니다.",
            "flow": "관계는 빠르게 점화될 수 있지만, 불꽃을 오래 지키려면 의도적인 관심이 필요합니다.",
        },
        tone="positive", keywords=["ignition", "passion", "spark"],
    ),
    TarotCard(
        id=101, slug="two-of-wands",
        english_name="2 of Wands", korean_name="완드 2",
        upright_meaning="계획, 가능성 탐색, 관계의 방향 설정",
        reversed_meaning="우유부단, 기회 미루기, 안전지대 안주",
        love_meanings={
            "self": "당신은 이 감정에 대해 '다음 스텝'을 구상하고 있으며, 행동 직전입니다.",
            "other": "상대도 관계의 발전 가능성을 저울질하고 있으나 아직 결정은 내리지 않았습니다.",
            "flow": "관계는 가능성의 문 앞에 서 있으며, 먼저 움직이는 쪽이 주도권을 잡게 됩니다.",
        },
        tone="neutral", keywords=["planning", "options", "initiative"],
    ),
    TarotCard(
        id=102, slug="three-of-wands",
        english_name="3 of Wands", korean_name="완드 3",
        upright_meaning="확장, 기대감, 더 넓은 관계로의 진전",
        reversed_meaning="지연, 기대 좌절, 시야가 좁아짐",
        love_meanings={
            "self": "당신은 이 관계가 한 단계 더 넓어지길 바라며, 적극적으로 미래를 그리고 있습니다.",
            "other": "상대도 당신과의 관계에 대해 장기적 가능성을 열어두고 있을 수 있습니다.",
            "flow": "관계는 점점 더 확장되는 기류를 타며, 서로의 세계를 공유하는 방향으로 흐릅니다.",
        },
        tone="positive", keywords=["expansion", "foresight", "progress"],
    ),
    TarotCard(
        id=103, slug="four-of-wands",
        english_name="4 of Wands", korean_name="완드 4",
        upright_meaning="축하, 안정된 기쁨, 관계의 공식화",
        reversed_meaning="불안정, 아직 이른 축하, 기반 부족",
        love_meanings={
            "self": "당신은 이 관계에서 안정감과 축하할 수 있는 순간을 갈망하고 있습니다.",
            "other": "상대도 당신과의 관계에서 편안한 기쁨을 느끼고 있을 가능성이 높습니다.",
            "flow": "관계는 서로에게 '우리'라는 감각이 생기는 단계로 접어들 수 있습니다.",
        },
        tone="positive", keywords=["celebration", "stability", "milestone"],
    ),
    TarotCard(
        id=104, slug="five-of-wands",
        english_name="5 of Wands", korean_name="완드 5",
        upright_meaning="경쟁, 의견 충돌, 에너지 분산",
        reversed_meaning="갈등 회피, 내적 혼란, 소모전",
        love_meanings={
            "self": "당신은 감정에 확신이 있으면서도, 상황이 뜻대로 흘러가지 않아 초조합니다.",
            "other": "상대방도 감정은 있지만 여러 현실적 요소들로 마음이 분산되어 있을 수 있습니다.",
            "flow": "관계에 잡음이 섞이기 쉬운 시기입니다. 타이밍과 방식에 주의가 필요합니다.",
        },
        tone="challenging", keywords=["conflict", "competition", "tension"],
    ),
    TarotCard(
        id=105, slug="six-of-wands",
        english_name="6 of Wands", korean_name="완드 6",
        upright_meaning="승리, 인정, 자신감 회복",
        reversed_meaning="허세, 인정 갈구, 자기 과시",
        love_meanings={
            "self": "당신은 이 관계에서 자신감을 되찾았으며, 상대에게 인정받고 있다고 느낍니다.",
            "other": "상대는 당신을 매력적으로 인식하고 있으며, 주변에도 긍정적으로 이야기할 수 있습니다.",
            "flow": "관계에 활력이 도는 시기이며, 서로에 대한 확신이 커지는 흐름입니다.",
        },
        tone="positive", keywords=["victory", "recognition", "confidence"],
    ),
    TarotCard(
        id=106, slug="seven-of-wands",
        english_name="7 of Wands", korean_name="완드 7",
        upright_meaning="방어, 입장 지키기, 도전에 맞서기",
        reversed_meaning="지침, 포기 직전, 자기 방어 과잉",
        love_meanings={
            "self": "당신은 이 감정을 지키고 싶지만 외부 환경이나 주변 시선이 부담스럽습니다.",
            "other": "상대도 당신에 대한 마음은 있으나, 지금 자기 상황을 지키는 데 에너지를 쓰고 있습니다.",
            "flow": "관계를 유지하려면 약간의 투지가 필요한 구간이며, 쉽게 흔들리지 않아야 합니다.",
        },
        tone="challenging", keywords=["defense", "persistence", "pressure"],
    ),
    TarotCard(
        id=107, slug="eight-of-wands",
        english_name="8 of Wands", korean_name="완드 8",
        upright_meaning="속도, 메시지 도착, 급진전",
        reversed_meaning="지연, 오해, 타이밍 어긋남",
        love_meanings={
            "self": "당신의 감정은 빠르게 움직이고 있으며, 곧 어떤 형태로든 표현될 것입니다.",
            "other": "상대에게서 연락이나 신호가 빠르게 올 수 있으며, 반응 속도가 빨라집니다.",
            "flow": "관계가 단기간에 급속히 진전될 수 있는 에너지가 흐르고 있습니다.",
        },
        tone="positive", keywords=["speed", "message", "momentum"],
    ),
    TarotCard(
        id=108, slug="nine-of-wands",
        english_name="9 of Wands", korean_name="완드 9",
        upright_meaning="경계심, 지친 투지, 마지막 방어선",
        reversed_meaning="번아웃, 의심 과잉, 벽 세우기",
        love_meanings={
            "self": "당신은 과거의 상처 때문에 마음을 쉽게 열지 못하고, 경계를 유지하고 있습니다.",
            "other": "상대도 감정이 있지만 이전 경험으로 인해 신중하게 접근하고 있을 수 있습니다.",
            "flow": "관계가 한 단계 더 가려면 서로의 벽을 인정하고 천천히 허무는 과정이 필요합니다.",
        },
        tone="challenging", keywords=["guarded", "resilience", "fatigue"],
    ),
    TarotCard(
        id=109, slug="ten-of-wands",
        english_name="10 of Wands", korean_name="완드 10",
        upright_meaning="과중한 짐, 책임감, 혼자 감당하기",
        reversed_meaning="짐 내려놓기, 위임, 한계 인정",
        love_meanings={
            "self": "당신은 이 관계에서 너무 많은 것을 혼자 짊어지려 하고 있습니다.",
            "other": "상대는 지금 자기 삶의 무게에 짓눌려 있어 감정적 여유가 부족할 수 있습니다.",
            "flow": "관계가 무거워지기 전에 역할 분담과 솔직한 대화가 필요한 시점입니다.",
        },
        tone="challenging", keywords=["burden", "overload", "responsibility"],
    ),
    TarotCard(
        id=110, slug="page-of-wands",
        english_name="Page of Wands", korean_name="완드의 시종",
        upright_meaning="호기심, 새로운 소식, 풋풋한 관심",
        reversed_meaning="변덕, 가벼운 호기심, 진지함 부족",
        love_meanings={
            "self": "당신에게 새로운 관심이 싹트고 있으며, 아직 가볍지만 에너지는 진짜입니다.",
            "other": "상대는 가벼운 호감으로 당신에게 연락하거나 접근해 볼까 생각 중일 수 있습니다.",
            "flow": "관계는 아직 초기 불꽃 단계이며, 가볍게 시작해 점점 깊어질 가능성이 있습니다.",
        },
        tone="positive", keywords=["curiosity", "news", "youthful"],
    ),
    TarotCard(
        id=111, slug="knight-of-wands",
        english_name="Knight of Wands", korean_name="완드의 기사",
        upright_meaning="열정적 돌진, 모험, 빠른 접근",
        reversed_meaning="성급함, 무모함, 열기만 있고 지속력 부족",
        love_meanings={
            "self": "당신은 이 사람에게 강렬하게 끌리며, 망설임 없이 다가가고 싶어 합니다.",
            "other": "상대도 당신에게 빠르게 반응하지만, 장기적으로 머물 의지는 아직 불확실합니다.",
            "flow": "관계는 빠르게 불붙을 수 있지만, 지속시키려면 속도 조절이 관건입니다.",
        },
        tone="neutral", keywords=["pursuit", "adventure", "impulsive"],
    ),
    TarotCard(
        id=112, slug="queen-of-wands",
        english_name="Queen of Wands", korean_name="완드의 여왕",
        upright_meaning="자신감, 따뜻한 카리스마, 독립적 매력",
        reversed_meaning="질투, 통제욕, 자존심 과잉",
        love_meanings={
            "self": "당신은 이 관계에서 자기 가치를 알고 있으며, 당당하게 감정을 표현할 준비가 되어 있습니다.",
            "other": "상대는 당신의 자신감과 에너지에 끌리며, 존경과 호감을 동시에 느낍니다.",
            "flow": "관계는 서로의 개성을 존중할수록 더 뜨거워지며, 독립성이 매력이 됩니다.",
        },
        tone="positive", keywords=["charisma", "warmth", "independence"],
    ),
    TarotCard(
        id=113, slug="king-of-wands",
        english_name="King of Wands", korean_name="완드의 왕",
        upright_meaning="리더십, 비전, 성숙한 열정",
        reversed_meaning="독선, 지배욕, 유연성 부족",
        love_meanings={
            "self": "당신은 이 관계를 주도적으로 이끌 수 있는 내적 힘과 확신을 갖추고 있습니다.",
            "other": "상대는 결단력 있고 비전이 있는 사람이며, 감정 표현에도 솔직합니다.",
            "flow": "관계는 누군가의 확실한 리드 아래 방향이 잡히며, 우유부단함은 독이 됩니다.",
        },
        tone="positive", keywords=["leadership", "vision", "decisiveness"],
    ),

    # ═══════════════════════════════════════
    #  Cups (컵) — 감정·사랑·관계
    # ═══════════════════════════════════════
    TarotCard(
        id=200, slug="ace-of-cups",
        english_name="Ace of Cups", korean_name="컵 에이스",
        upright_meaning="감정의 시작, 사랑의 문 열림, 순수한 마음",
        reversed_meaning="감정 차단, 사랑의 거부, 공허함",
        love_meanings={
            "self": "당신의 마음에 사랑을 받아들일 준비가 되어가고 있으며, 감정의 문이 열리고 있습니다.",
            "other": "상대도 당신에게 진심 어린 감정이 싹트기 시작하며, 마음이 부드러워지고 있습니다.",
            "flow": "관계에 새로운 감정의 물결이 밀려오고 있으며, 흘러가는 대로 두면 자연스레 깊어집니다.",
        },
        tone="positive", keywords=["love", "opening", "emotional-start"],
    ),
    TarotCard(
        id=201, slug="two-of-cups",
        english_name="2 of Cups", korean_name="컵 2",
        upright_meaning="상호 끌림, 감정 교환, 마음의 합",
        reversed_meaning="불균형, 일방적 감정, 소통 단절",
        love_meanings={
            "self": "당신은 이 사람과 감정의 온도가 맞다고 느끼며, 서로를 향한 마음을 확인하고 싶어 합니다.",
            "other": "상대도 당신에게 감정적 동기화를 느끼고 있으며, 가까워지고 싶은 마음이 있습니다.",
            "flow": "관계는 감정의 주고받음이 균형을 이루며, 서로 '통한다'는 확신이 커지는 흐름입니다.",
        },
        tone="positive", keywords=["mutual", "connection", "harmony"],
    ),
    TarotCard(
        id=202, slug="three-of-cups",
        english_name="3 of Cups", korean_name="컵 3",
        upright_meaning="기쁨, 우정, 사교적 연결",
        reversed_meaning="삼각관계, 과음, 피상적 관계",
        love_meanings={
            "self": "당신은 이 관계에서 축하와 기쁨을 함께 나누고 싶은 마음이 큽니다.",
            "other": "상대는 당신과 함께하는 시간을 즐기고 있으며, 주변에도 긍정적으로 이야기합니다.",
            "flow": "관계는 밝고 사교적인 에너지로 둘러싸여 있지만, 깊이를 확인하는 것도 필요합니다.",
        },
        tone="positive", keywords=["celebration", "friendship", "joy"],
    ),
    TarotCard(
        id=203, slug="four-of-cups",
        english_name="4 of Cups", korean_name="컵 4",
        upright_meaning="무관심, 감정적 권태, 제안을 못 보는 상태",
        reversed_meaning="재인식, 동기 회복, 감사 되찾기",
        love_meanings={
            "self": "당신은 지금 감정적으로 무기력하거나, 이 관계에 흥미를 잃고 있을 수 있습니다.",
            "other": "상대는 당신의 마음에 관심이 있지만 지금은 자기 내면에 빠져 있어 눈치채지 못합니다.",
            "flow": "관계에 정체 기류가 흐르고 있으며, 새로운 자극보다 내면의 점검이 먼저입니다.",
        },
        tone="challenging", keywords=["apathy", "stagnation", "overlooking"],
    ),
    TarotCard(
        id=204, slug="five-of-cups",
        english_name="5 of Cups", korean_name="컵 5",
        upright_meaning="상실감, 후회, 남은 것을 보지 못함",
        reversed_meaning="회복, 수용, 새로운 관점",
        love_meanings={
            "self": "당신은 과거의 실망이나 상처에 아직 마음이 붙잡혀 앞으로 나아가지 못하고 있습니다.",
            "other": "상대도 이전 관계나 경험의 아픔을 안고 있어 쉽게 마음을 열지 못합니다.",
            "flow": "관계가 나아가려면 잃은 것보다 남아 있는 것에 시선을 돌리는 전환이 필요합니다.",
        },
        tone="challenging", keywords=["grief", "regret", "recovery"],
    ),
    TarotCard(
        id=205, slug="six-of-cups",
        english_name="6 of Cups", korean_name="컵 6",
        upright_meaning="추억, 순수함, 과거와의 재연결",
        reversed_meaning="과거 집착, 미화, 성장 거부",
        love_meanings={
            "self": "당신은 이 사람과의 추억이나 과거의 감정이 다시 떠올라 마음이 부드러워지고 있습니다.",
            "other": "상대도 당신과의 옛 기억을 떠올리며, 그리움이나 편안함을 느끼고 있을 수 있습니다.",
            "flow": "관계에 과거의 따뜻한 기억이 다리 역할을 하며, 재연결의 가능성을 열어줍니다.",
        },
        tone="neutral", keywords=["nostalgia", "innocence", "reconnection"],
    ),
    TarotCard(
        id=206, slug="seven-of-cups",
        english_name="7 of Cups", korean_name="컵 7",
        upright_meaning="환상, 선택지 과다, 현실과 이상의 괴리",
        reversed_meaning="현실 직면, 명확한 선택, 환상 깨기",
        love_meanings={
            "self": "당신은 상대에 대한 기대가 현실보다 커져 있으며, 이상과 현실 사이에서 헤매고 있습니다.",
            "other": "상대가 보여주는 모습과 실제 감정이 다를 수 있으니 신호를 냉정하게 읽어야 합니다.",
            "flow": "관계에 환상이 섞여 있으며, 진짜 감정인지 투영인지 구분하는 것이 먼저입니다.",
        },
        tone="challenging", keywords=["illusion", "choices", "fantasy"],
    ),
    TarotCard(
        id=207, slug="eight-of-cups",
        english_name="8 of Cups", korean_name="컵 8",
        upright_meaning="떠남, 감정적 정리, 더 깊은 것을 찾아서",
        reversed_meaning="미련, 떠나지 못함, 반복되는 회귀",
        love_meanings={
            "self": "당신은 이 관계가 채워주지 못하는 무언가를 느끼며, 거리를 둘까 고민하고 있습니다.",
            "other": "상대도 감정이 식었거나, 더 깊은 연결을 위해 혼자만의 시간이 필요할 수 있습니다.",
            "flow": "관계는 정체되기보다 한쪽이 먼저 움직이는 형태로 변화를 맞이할 수 있습니다.",
        },
        tone="challenging", keywords=["departure", "search", "letting-go"],
    ),
    TarotCard(
        id=208, slug="nine-of-cups",
        english_name="9 of Cups", korean_name="컵 9",
        upright_meaning="만족, 감정적 풍요, 소원 성취",
        reversed_meaning="과욕, 겉만 화려한 행복, 만족 부족",
        love_meanings={
            "self": "당신은 이 관계에서 원하던 감정적 충족을 느끼고 있거나 곧 느끼게 됩니다.",
            "other": "상대도 당신과의 관계에 만족하고 있으며, 함께 있을 때 행복을 느낍니다.",
            "flow": "관계는 서로의 감정 욕구가 채워지는 풍요로운 흐름이며, 감사를 나눌 시기입니다.",
        },
        tone="positive", keywords=["satisfaction", "wish", "fulfillment"],
    ),
    TarotCard(
        id=209, slug="ten-of-cups",
        english_name="10 of Cups", korean_name="컵 10",
        upright_meaning="완전한 행복, 감정적 완성, 가족적 사랑",
        reversed_meaning="깨진 이상, 관계 불화, 기대와 현실 괴리",
        love_meanings={
            "self": "당신은 이 관계에서 궁극적인 정서적 안정과 행복을 꿈꾸고 있습니다.",
            "other": "상대도 당신과 함께 장기적인 행복을 그릴 수 있는 마음 상태에 와 있습니다.",
            "flow": "관계가 서로에게 '집'과 같은 안식이 되는 단계로 향하고 있습니다.",
        },
        tone="positive", keywords=["bliss", "family", "emotional-home"],
    ),
    TarotCard(
        id=210, slug="page-of-cups",
        english_name="Page of Cups", korean_name="컵의 시종",
        upright_meaning="감성적 메시지, 풋풋한 고백, 직감의 신호",
        reversed_meaning="감정 미숙, 비현실적 기대, 서툰 표현",
        love_meanings={
            "self": "당신 안에 순수하고 직감적인 감정이 올라오고 있으며, 표현하고 싶은 충동이 생깁니다.",
            "other": "상대가 서툴더라도 진심 어린 감정 표현을 시도하거나 메시지를 보낼 수 있습니다.",
            "flow": "관계에 감성적인 신호가 교환되는 시기이며, 작은 표현이 큰 의미를 가집니다.",
        },
        tone="positive", keywords=["message", "innocence", "intuition"],
    ),
    TarotCard(
        id=211, slug="knight-of-cups",
        english_name="Knight of Cups", korean_name="컵의 기사",
        upright_meaning="로맨틱한 접근, 감정 고백, 이상적 구애",
        reversed_meaning="비현실적 로맨스, 기분파, 감정 이용",
        love_meanings={
            "self": "당신은 로맨틱한 방식으로 마음을 전하고 싶으며, 감정에 충실하려 합니다.",
            "other": "상대는 당신에게 다정하고 감성적인 접근을 하거나 고백을 준비하고 있을 수 있습니다.",
            "flow": "관계에 로맨틱한 에너지가 흐르며, 감정이 행동으로 옮겨지는 전환점이 올 수 있습니다.",
        },
        tone="positive", keywords=["romance", "proposal", "dreamy"],
    ),
    TarotCard(
        id=212, slug="queen-of-cups",
        english_name="Queen of Cups", korean_name="컵의 여왕",
        upright_meaning="깊은 공감, 감정적 성숙, 직관적 이해",
        reversed_meaning="감정 과잉, 경계 부족, 남의 감정에 매몰",
        love_meanings={
            "self": "당신은 상대의 마음을 깊이 읽을 수 있으며, 감정적으로 성숙한 태도를 갖추고 있습니다.",
            "other": "상대는 당신에게 감정적으로 깊이 연결되어 있으며 내적 안정감을 느끼고 있습니다.",
            "flow": "관계는 공감과 이해가 바탕이 되어 더 깊은 수준의 친밀감으로 향하고 있습니다.",
        },
        tone="positive", keywords=["empathy", "depth", "intuitive-love"],
    ),
    TarotCard(
        id=213, slug="king-of-cups",
        english_name="King of Cups", korean_name="컵의 왕",
        upright_meaning="감정의 균형, 성숙한 사랑, 지혜로운 돌봄",
        reversed_meaning="감정 억압, 냉담한 겉, 내면의 폭풍",
        love_meanings={
            "self": "당신은 감정을 다스리면서도 진심을 잃지 않는 균형 잡힌 상태에 있습니다.",
            "other": "상대는 겉으로 차분하지만 내면에는 깊은 감정이 있으며, 안정적인 파트너를 원합니다.",
            "flow": "관계는 감정의 깊이와 이성의 균형이 맞아떨어질 때 가장 아름답게 성장합니다.",
        },
        tone="positive", keywords=["balance", "maturity", "wise-love"],
    ),

    # ═══════════════════════════════════════
    #  Swords (소드 / 검) — 생각·소통·갈등
    # ═══════════════════════════════════════
    TarotCard(
        id=300, slug="ace-of-swords",
        english_name="Ace of Swords", korean_name="소드 에이스",
        upright_meaning="명확한 진실, 돌파구, 결정적 깨달음",
        reversed_meaning="혼란, 잘못된 판단, 진실 외면",
        love_meanings={
            "self": "당신은 이 관계에 대해 결정적인 진실을 직면해야 하는 시점에 서 있습니다.",
            "other": "상대도 관계의 본질에 대해 명확한 생각을 갖게 되는 계기가 올 수 있습니다.",
            "flow": "관계에 진실과 명확함이 찾아오며, 모호함이 걷히는 결정적 순간이 다가옵니다.",
        },
        tone="neutral", keywords=["truth", "clarity", "breakthrough"],
    ),
    TarotCard(
        id=301, slug="two-of-swords",
        english_name="2 of Swords", korean_name="소드 2",
        upright_meaning="결정 유보, 양자택일, 눈을 감은 상태",
        reversed_meaning="정보 과부하, 결국 선택, 막힘 해소",
        love_meanings={
            "self": "당신은 두 가지 감정 사이에서 어느 쪽도 선택하지 못한 채 멈춰 있습니다.",
            "other": "상대도 당신에 대한 마음을 결정하지 못하고, 답을 미루고 있을 수 있습니다.",
            "flow": "관계는 선택의 순간을 앞두고 정체되어 있으며, 무시할수록 묵직해집니다.",
        },
        tone="challenging", keywords=["indecision", "stalemate", "denial"],
    ),
    TarotCard(
        id=302, slug="three-of-swords",
        english_name="3 of Swords", korean_name="소드 3",
        upright_meaning="마음의 상처, 이별, 아픈 진실",
        reversed_meaning="상처 회복, 용서, 아물지 않은 흉터",
        love_meanings={
            "self": "당신은 이 관계에서 받은 상처가 아직 생생하며, 감정적 고통 속에 있습니다.",
            "other": "상대도 의도치 않게 상처를 주었거나, 자신도 관계에서 아파하고 있을 수 있습니다.",
            "flow": "관계에 아픔이 있었지만, 그 아픔을 직시해야 비로소 치유와 전진이 가능합니다.",
        },
        tone="challenging", keywords=["heartbreak", "pain", "truth-hurts"],
    ),
    TarotCard(
        id=303, slug="four-of-swords",
        english_name="4 of Swords", korean_name="소드 4",
        upright_meaning="휴식, 회복, 감정적 재충전",
        reversed_meaning="불안 속 쉼, 강제 휴식, 고립",
        love_meanings={
            "self": "당신은 감정적으로 지쳐 있으며, 관계보다 자기 자신을 돌보는 시간이 필요합니다.",
            "other": "상대도 지금은 감정적 에너지를 아끼고 있어, 반응이 느릴 수 있습니다.",
            "flow": "관계에 잠시 쉬어가는 구간이 필요하며, 이 휴식이 오히려 관계를 살릴 수 있습니다.",
        },
        tone="neutral", keywords=["rest", "recovery", "pause"],
    ),
    TarotCard(
        id=304, slug="five-of-swords",
        english_name="5 of Swords", korean_name="소드 5",
        upright_meaning="승자 없는 싸움, 자존심 대결, 쓸쓸한 승리",
        reversed_meaning="화해, 갈등 종료, 자존심 내려놓기",
        love_meanings={
            "self": "당신은 이 관계에서 자존심 때문에 감정을 숨기거나 상대를 밀어내고 있을 수 있습니다.",
            "other": "상대도 의지가 있더라도 자존심에 가로막혀 먼저 다가오기 어려운 상태입니다.",
            "flow": "관계에 갈등의 잔해가 남아 있으며, 누가 먼저 내려놓느냐가 흐름을 바꿉니다.",
        },
        tone="challenging", keywords=["ego", "conflict", "hollow-win"],
    ),
    TarotCard(
        id=305, slug="six-of-swords",
        english_name="6 of Swords", korean_name="소드 6",
        upright_meaning="이동, 전환, 감정적 탈출",
        reversed_meaning="붙잡힘, 변화 거부, 되돌아감",
        love_meanings={
            "self": "당신은 아픈 감정에서 벗어나 새로운 곳으로 이동하려는 의지가 생기고 있습니다.",
            "other": "상대도 관계의 변화를 받아들이기 시작하며, 새로운 국면을 모색하고 있습니다.",
            "flow": "관계는 힘들었던 과거에서 벗어나 차분하지만 확실한 전환기를 맞이하고 있습니다.",
        },
        tone="neutral", keywords=["transition", "healing-journey", "moving-on"],
    ),
    TarotCard(
        id=306, slug="seven-of-swords",
        english_name="7 of Swords", korean_name="소드 7",
        upright_meaning="전략, 숨김, 혼자만의 계산",
        reversed_meaning="비밀 폭로, 양심, 정직한 대면",
        love_meanings={
            "self": "당신은 속마음을 완전히 드러내지 않고, 전략적으로 감정을 운영하고 있습니다.",
            "other": "상대가 무언가를 숨기고 있거나, 진심과 다른 행동을 하고 있을 가능성이 있습니다.",
            "flow": "관계에 숨겨진 부분이 있으며, 투명해지지 않으면 신뢰가 흔들릴 수 있습니다.",
        },
        tone="challenging", keywords=["deception", "strategy", "secrecy"],
    ),
    TarotCard(
        id=307, slug="eight-of-swords",
        english_name="8 of Swords", korean_name="소드 8",
        upright_meaning="갇힌 느낌, 자기 제한, 탈출구를 못 보는 상태",
        reversed_meaning="해방, 새로운 시각, 속박에서 벗어남",
        love_meanings={
            "self": "당신은 관계에서 선택지가 없다고 느끼지만, 실제로는 스스로 길을 막고 있을 수 있습니다.",
            "other": "상대도 자발적으로 움직이지 못하고 상황에 갇혀 있다고 느끼고 있습니다.",
            "flow": "관계가 정체된 것처럼 보이지만, 시각을 바꾸면 출구가 보이는 구조입니다.",
        },
        tone="challenging", keywords=["trapped", "self-imposed", "blind-spot"],
    ),
    TarotCard(
        id=308, slug="nine-of-swords",
        english_name="9 of Swords", korean_name="소드 9",
        upright_meaning="불안, 밤새 고민, 과도한 걱정",
        reversed_meaning="걱정 해소, 도움 요청, 최악은 지남",
        love_meanings={
            "self": "당신은 상대의 마음이나 관계의 미래에 대해 밤잠을 설칠 정도로 불안해하고 있습니다.",
            "other": "상대방이 어젯밤 당신의 연락을 보고 고민하며 잠 못 이뤘을 수 있습니다.",
            "flow": "관계에 불안 에너지가 흐르고 있지만, 실제보다 과장된 걱정일 가능성이 높습니다.",
        },
        tone="challenging", keywords=["anxiety", "overthinking", "sleepless"],
    ),
    TarotCard(
        id=309, slug="ten-of-swords",
        english_name="10 of Swords", korean_name="소드 10",
        upright_meaning="끝, 바닥, 더 이상 내려갈 곳 없는 상태",
        reversed_meaning="재기, 최악은 끝남, 서서히 일어남",
        love_meanings={
            "self": "당신은 이 관계에서 극심한 아픔을 경험했으며, 끝을 체감하고 있습니다.",
            "other": "상대도 관계의 종말을 느끼고 있거나, 이미 감정적으로 떠난 상태일 수 있습니다.",
            "flow": "관계의 한 챕터가 확실히 끝나고 있으며, 이 바닥이 새로운 시작의 밑바닥이 됩니다.",
        },
        tone="challenging", keywords=["ending", "rock-bottom", "rebirth"],
    ),
    TarotCard(
        id=310, slug="page-of-swords",
        english_name="Page of Swords", korean_name="소드의 시종",
        upright_meaning="호기심, 정보 수집, 날카로운 관찰",
        reversed_meaning="험담, 스파이, 미성숙한 비판",
        love_meanings={
            "self": "당신은 상대에 대한 정보를 모으거나 SNS를 확인하며 마음의 단서를 찾고 있습니다.",
            "other": "상대도 당신에 대해 은근히 정보를 수집하거나 관심을 갖고 살피고 있을 수 있습니다.",
            "flow": "관계는 탐색과 관찰의 단계이며, 직접 대화가 추측보다 훨씬 정확합니다.",
        },
        tone="neutral", keywords=["investigation", "curiosity", "vigilance"],
    ),
    TarotCard(
        id=311, slug="knight-of-swords",
        english_name="Knight of Swords", korean_name="소드의 기사",
        upright_meaning="직진, 직설적 접근, 빠른 결단",
        reversed_meaning="무례함, 생각 없는 말, 감정 무시",
        love_meanings={
            "self": "당신은 답답함을 깨고 직접 물어보거나, 확실한 행동을 취하고 싶어 합니다.",
            "other": "상대는 직설적으로 대화하거나 갑작스러운 연락을 할 수 있는 에너지 상태입니다.",
            "flow": "관계에 빠른 결단이나 직접적인 대화가 필요하며, 돌려 말하면 기회를 놓칩니다.",
        },
        tone="neutral", keywords=["directness", "speed", "confrontation"],
    ),
    TarotCard(
        id=312, slug="queen-of-swords",
        english_name="Queen of Swords", korean_name="소드의 여왕",
        upright_meaning="냉철한 지혜, 독립적 판단, 경계의 기술",
        reversed_meaning="냉정함 과잉, 방어적, 감정 차단",
        love_meanings={
            "self": "당신은 감정에 휩쓸리지 않고 이 관계를 냉정하게 평가할 수 있는 힘이 있습니다.",
            "other": "상대는 똑똑하고 독립적이지만, 쉽게 마음을 열지 않는 사람일 수 있습니다.",
            "flow": "관계에서 감정만큼 명확한 소통과 경계 설정이 중요한 시기입니다.",
        },
        tone="neutral", keywords=["clarity", "independence", "boundaries"],
    ),
    TarotCard(
        id=313, slug="king-of-swords",
        english_name="King of Swords", korean_name="소드의 왕",
        upright_meaning="이성적 리더십, 공정한 판단, 명확한 소통",
        reversed_meaning="권위적, 냉담, 감정 억압",
        love_meanings={
            "self": "당신은 감정보다 논리로 관계를 분석하려 하며, 현명한 판단을 내리려 합니다.",
            "other": "상대는 감정을 잘 드러내지 않지만, 내면의 판단은 명확하게 내린 상태입니다.",
            "flow": "관계에 명확한 의사소통이 핵심이며, 감정의 언어보다 사실의 언어가 먼저 필요합니다.",
        },
        tone="neutral", keywords=["intellect", "authority", "fair-judgment"],
    ),

    # ═══════════════════════════════════════
    #  Pentacles (펜타클) — 현실·안정·물질
    # ═══════════════════════════════════════
    TarotCard(
        id=400, slug="ace-of-pentacles",
        english_name="Ace of Pentacles", korean_name="펜타클 에이스",
        upright_meaning="새로운 기회, 물질적 시작, 현실적 기반",
        reversed_meaning="기회 놓침, 불안정, 투자 실패",
        love_meanings={
            "self": "당신은 이 관계를 꿈이 아닌 현실로 만들 기회가 눈앞에 와 있습니다.",
            "other": "상대도 당신과의 관계를 구체적이고 현실적인 방향으로 발전시키고 싶어 할 수 있습니다.",
            "flow": "관계에 현실적 기반이 갖춰지기 시작하며, 안정적인 시작점이 열립니다.",
        },
        tone="positive", keywords=["opportunity", "grounding", "tangible-start"],
    ),
    TarotCard(
        id=401, slug="two-of-pentacles",
        english_name="2 of Pentacles", korean_name="펜타클 2",
        upright_meaning="균형 잡기, 멀티태스킹, 유연한 대응",
        reversed_meaning="균형 상실, 무리한 저글링, 우선순위 혼란",
        love_meanings={
            "self": "당신은 연애와 다른 삶의 영역 사이에서 균형을 잡느라 바쁜 상태입니다.",
            "other": "상대도 당신에게 마음이 있지만 일이나 다른 일정 때문에 시간이 부족합니다.",
            "flow": "관계는 서로의 바쁜 일상을 이해하고 유연하게 조율할 때 오래갑니다.",
        },
        tone="neutral", keywords=["balance", "juggling", "adaptability"],
    ),
    TarotCard(
        id=402, slug="three-of-pentacles",
        english_name="3 of Pentacles", korean_name="펜타클 3",
        upright_meaning="협력, 함께 만들어감, 관계에 대한 노력",
        reversed_meaning="불협, 혼자만의 노력, 팀워크 부재",
        love_meanings={
            "self": "당신은 이 관계를 위해 구체적인 노력과 정성을 기울이고 있습니다.",
            "other": "상대도 당신과의 관계를 '함께 쌓아가는 것'으로 인식하기 시작했습니다.",
            "flow": "관계는 두 사람의 합작품처럼 함께 지을 때 가장 견고해집니다.",
        },
        tone="positive", keywords=["teamwork", "effort", "building-together"],
    ),
    TarotCard(
        id=403, slug="four-of-pentacles",
        english_name="4 of Pentacles", korean_name="펜타클 4",
        upright_meaning="집착, 통제, 안전에 대한 과도한 욕구",
        reversed_meaning="놓아주기, 관대함, 통제 포기",
        love_meanings={
            "self": "당신은 이 관계를 잃을까 봐 마음을 꽉 쥐고 있으며, 놓아주기가 어렵습니다.",
            "other": "상대는 감정이 있어도 자기 영역을 내주지 않으려 하며, 쉽게 열리지 않습니다.",
            "flow": "관계에서 집착은 오히려 상대를 밀어내며, 적당히 놓아주는 것이 잡는 것입니다.",
        },
        tone="challenging", keywords=["possessiveness", "control", "fear-of-loss"],
    ),
    TarotCard(
        id=404, slug="five-of-pentacles",
        english_name="5 of Pentacles", korean_name="펜타클 5",
        upright_meaning="결핍, 외로움, 도움을 구하지 못함",
        reversed_meaning="회복, 도움 수용, 최악에서 벗어남",
        love_meanings={
            "self": "당신은 이 관계에서 외롭고 소외감을 느끼며, 지금 정서적으로 힘든 상태입니다.",
            "other": "상대도 외로움이나 결핍감을 안고 있어 다가가기 어려운 상태일 수 있습니다.",
            "flow": "관계에 추위가 느껴지지만, 서로에게 손을 내밀면 함께 이겨낼 수 있습니다.",
        },
        tone="challenging", keywords=["hardship", "loneliness", "struggle"],
    ),
    TarotCard(
        id=405, slug="six-of-pentacles",
        english_name="6 of Pentacles", korean_name="펜타클 6",
        upright_meaning="베풂, 주고받음의 균형, 너그러움",
        reversed_meaning="불균등, 은혜 갚음 강요, 상하 관계",
        love_meanings={
            "self": "당신은 이 관계에서 기꺼이 주는 쪽이며, 상대에게 정성을 아끼지 않습니다.",
            "other": "상대도 당신의 호의를 받아들이고 있으며, 보답하고 싶은 마음이 있을 수 있습니다.",
            "flow": "관계는 주고받음의 균형이 맞을수록 건강해지며, 한쪽만 주면 지칩니다.",
        },
        tone="positive", keywords=["generosity", "exchange", "fairness"],
    ),
    TarotCard(
        id=406, slug="seven-of-pentacles",
        english_name="7 of Pentacles", korean_name="펜타클 7",
        upright_meaning="기다림, 결실 점검, 인내의 시간",
        reversed_meaning="조바심, 노력 대비 성과 부족, 포기 유혹",
        love_meanings={
            "self": "당신은 이 관계에 공들인 시간이 결실을 맺을지 불안하면서도 기대하고 있습니다.",
            "other": "상대도 관계의 성과를 은근히 점검하며, 투자 대비 가치를 판단하고 있습니다.",
            "flow": "관계는 지금 당장 결과가 나오지 않지만, 씨앗은 이미 뿌려진 상태입니다.",
        },
        tone="neutral", keywords=["patience", "harvest", "evaluation"],
    ),
    TarotCard(
        id=407, slug="eight-of-pentacles",
        english_name="8 of Pentacles", korean_name="펜타클 8",
        upright_meaning="꾸준한 노력, 성실함, 관계에 대한 갈고닦음",
        reversed_meaning="완벽주의, 과로, 감정 무시한 채 노력만",
        love_meanings={
            "self": "당신은 이 관계를 위해 묵묵히 노력하고 있으며, 진심으로 더 나아지려 합니다.",
            "other": "상대도 자기 나름의 방식으로 관계를 위해 성실하게 무언가를 준비하고 있을 수 있습니다.",
            "flow": "관계는 화려한 이벤트보다 일상적인 정성이 쌓여야 진짜 결실을 맺습니다.",
        },
        tone="positive", keywords=["dedication", "craft", "steady-effort"],
    ),
    TarotCard(
        id=408, slug="nine-of-pentacles",
        english_name="9 of Pentacles", korean_name="펜타클 9",
        upright_meaning="자립, 풍요, 혼자서도 빛나는 상태",
        reversed_meaning="외로운 성공, 사치, 관계 없는 풍요",
        love_meanings={
            "self": "당신은 혼자서도 충분히 매력적이고 안정된 상태이며, 자기 가치를 알고 있습니다.",
            "other": "상대는 당신의 독립적인 매력에 끌리며, 함께해도 각자의 품격이 유지되길 원합니다.",
            "flow": "관계는 의존이 아닌 선택으로 함께할 때 가장 높은 수준의 사랑이 됩니다.",
        },
        tone="positive", keywords=["self-worth", "luxury", "independence"],
    ),
    TarotCard(
        id=409, slug="ten-of-pentacles",
        english_name="10 of Pentacles", korean_name="펜타클 10",
        upright_meaning="유산, 장기적 안정, 가족의 미래",
        reversed_meaning="재정 갈등, 가족 불화, 불안정한 기반",
        love_meanings={
            "self": "당신은 이 관계에서 장기적인 안정과 미래를 함께 그리고 싶어 합니다.",
            "other": "상대도 당신과의 관계를 일시적이 아닌 지속 가능한 것으로 바라보고 있습니다.",
            "flow": "관계가 개인을 넘어 삶 전체의 안정으로 이어지는 깊은 연결을 향합니다.",
        },
        tone="positive", keywords=["legacy", "long-term", "security"],
    ),
    TarotCard(
        id=410, slug="page-of-pentacles",
        english_name="Page of Pentacles", korean_name="펜타클의 시종",
        upright_meaning="배움, 새로운 기술, 현실적 관심",
        reversed_meaning="무계획, 게으름, 기회 낭비",
        love_meanings={
            "self": "당신은 이 관계를 통해 무언가를 배우고 성장하려는 열린 자세가 있습니다.",
            "other": "상대는 진지하지만 아직 서툰 방식으로 당신에게 관심을 보이기 시작했습니다.",
            "flow": "관계는 아직 초기이지만, 현실적으로 쌓아가려는 태도가 있으면 오래갑니다.",
        },
        tone="positive", keywords=["study", "potential", "earnest"],
    ),
    TarotCard(
        id=411, slug="knight-of-pentacles",
        english_name="Knight of Pentacles", korean_name="펜타클의 기사",
        upright_meaning="성실함, 신뢰, 느리지만 확실한 접근",
        reversed_meaning="답답함, 변화 거부, 지루함",
        love_meanings={
            "self": "당신은 이 관계에 느리더라도 진심을 담아 꾸준히 다가가고 있습니다.",
            "other": "상대는 화려하진 않지만 성실하고 신뢰할 수 있는 사람이며, 꾸준히 당신을 생각합니다.",
            "flow": "관계는 속도보다 방향이 중요하며, 느린 만큼 쉽게 무너지지 않습니다.",
        },
        tone="positive", keywords=["reliability", "slow-steady", "trust"],
    ),
    TarotCard(
        id=412, slug="queen-of-pentacles",
        english_name="Queen of Pentacles", korean_name="펜타클의 여왕",
        upright_meaning="돌봄, 현실적 사랑, 풍요로운 안정",
        reversed_meaning="과보호, 물질 집착, 자기 돌봄 부족",
        love_meanings={
            "self": "당신은 상대를 따뜻하게 돌보면서도 현실적인 판단을 잃지 않는 균형을 갖추고 있습니다.",
            "other": "상대는 당신에게 편안함과 안정감을 느끼며, 일상을 함께 나누고 싶어 합니다.",
            "flow": "관계는 감정뿐 아니라 생활의 편안함이 함께할 때 가장 자연스럽게 자랍니다.",
        },
        tone="positive", keywords=["nurturing", "practical-love", "comfort"],
    ),
    TarotCard(
        id=413, slug="king-of-pentacles",
        english_name="King of Pentacles", korean_name="펜타클의 왕",
        upright_meaning="안정적 성공, 풍요, 신뢰할 수 있는 파트너",
        reversed_meaning="물질만능, 감정 무시, 소유욕",
        love_meanings={
            "self": "당신은 이 관계에서 안정적이고 든든한 존재가 되고 싶으며, 그 능력을 갖추고 있습니다.",
            "other": "상대는 감정적으로도 현실적으로도 신뢰할 수 있는 파트너를 지향하는 사람입니다.",
            "flow": "관계의 기반이 단단하며, 서로에게 실질적인 지지와 안정을 줄 수 있는 흐름입니다.",
        },
        tone="positive", keywords=["prosperity", "stability", "provider"],
    ),
]


# ── 전체 78장(메이저 22 + 마이너 56) ──

ALL_CARDS: list[TarotCard] = MAJOR_ARCANA + MINOR_ARCANA


# ── FullDeckCard.id (str) → TarotCard 매핑 ──

_SUIT_BASE = {"wands": 100, "cups": 200, "swords": 300, "pentacles": 400}
_COURT_OFFSET = {"page": 10, "knight": 11, "queen": 12, "king": 13}


def _build_deck_id_map() -> dict[str, TarotCard]:
    by_int_id = {card.id: card for card in ALL_CARDS}
    result: dict[str, TarotCard] = {}
    for i in range(22):
        result[f"major_{i:02d}"] = by_int_id[i]
    for suit, base in _SUIT_BASE.items():
        for num in range(1, 11):
            result[f"minor_{suit}_{num:02d}"] = by_int_id[base + num - 1]
        for court, offset in _COURT_OFFSET.items():
            result[f"minor_{suit}_{court}"] = by_int_id[base + offset]
    return result


CARD_BY_DECK_ID: dict[str, TarotCard] = _build_deck_id_map()
