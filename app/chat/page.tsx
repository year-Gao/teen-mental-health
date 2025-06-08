"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send, ImageIcon, Smile } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import { useRouter } from "next/navigation"

// AI回复模板
const aiResponses = {
  sad: [
    "我能感受到你现在的难过，这种情绪是完全正常和有效的。难过往往是我们内心对某种失去、失望或挫折的自然反应。\n\n首先，请允许自己感受这种情绪，不要急于摆脱它。情绪就像天气一样，会有阴晴圆缺，难过也会过去的。\n\n你可以尝试这些方法来照顾自己：\n• 找一个安静的地方，让眼泪自然流淌\n• 写下你的感受，不需要完美的文字\n• 听一些舒缓的音乐或做深呼吸\n• 如果愿意，可以和信任的朋友或家人分享\n\n记住，寻求帮助是勇敢的表现，不是软弱。你愿意和我分享是什么让你感到难过吗？我会一直在这里倾听。",

    "看到你现在的状态，我想告诉你：你的感受是真实的，也是重要的。难过不是你的错，也不意味着你不够坚强。\n\n每个人都会经历情绪的低谷，这是人生的一部分。就像植物需要雨水才能成长一样，我们的心灵有时也需要通过难过来处理和消化生活中的挑战。\n\n在这个时候，自我关怀特别重要：\n• 保证充足的睡眠和营养\n• 做一些让你感到舒适的小事\n• 避免对自己过于苛刻的评判\n• 提醒自己：这种感觉是暂时的\n\n如果你愿意，我们可以一起探索这种难过背后的原因，或者简单地聊聊其他能让你感到一丝温暖的事情。你现在最需要什么样的支持呢？",

    "我听到了你内心的声音，感谢你愿意表达你的感受。难过是一种很深层的情绪，它告诉我们某些对我们重要的东西受到了影响。\n\n在心理学中，我们把难过看作是一种适应性情绪——它帮助我们处理失去，促使我们寻求支持，也让我们更加珍惜美好的时光。\n\n现在，让我们一起做一个简单的练习：\n1. 深深吸气4秒，想象吸入平静\n2. 屏住呼吸4秒，让平静在体内扩散\n3. 慢慢呼气6秒，释放紧张和难过\n4. 重复3-5次\n\n同时，试着对自己说：'我允许自己感受这种情绪，我知道它会过去，我值得被关爱和理解。'\n\n你今天有没有做什么让自己感到哪怕一点点好受的事情？",
  ],

  anxious: [
    "我理解你现在的焦虑感受。焦虑就像是大脑的警报系统过度敏感了，它试图保护我们，但有时会对不存在的威胁做出反应。\n\n首先，让我们一起做一个立即缓解焦虑的练习——5-4-3-2-1接地技巧：\n• 说出5样你能看到的东西\n• 说出4样你能触摸到的东西\n• 说出3样你能听到的声音\n• 说出2样你能闻到的气味\n• 说出1样你能尝到的味道\n\n这个练习能帮助你的注意力回到当下，而不是被未来的担忧所困扰。\n\n长期来说，这些策略很有帮助：\n• 规律的运动，特别是有氧运动\n• 限制咖啡因和糖分摄入\n• 建立固定的睡眠时间\n• 学习区分'可控'和'不可控'的事情\n• 练习正念冥想\n\n你的焦虑主要集中在哪个方面？学业、人际关系，还是对未来的不确定？让我们一起找到更具体的应对方法。",

    "焦虑是一种非常常见的情绪体验，特别是在青少年时期。你的大脑正在快速发育，同时面临着学业、社交、身份认同等多重压力，出现焦虑是完全可以理解的。\n\n让我教你一个强大的焦虑管理技巧——'担忧时间'法：\n1. 每天设定15分钟作为'担忧时间'\n2. 当焦虑想法出现时，告诉自己'我会在担忧时间处理这个'\n3. 把担忧写在纸上，推迟到指定时间\n4. 在担忧时间里，对每个担忧问自己：\n   - 这个担忧现实吗？\n   - 我能为此做些什么？\n   - 最坏的情况是什么？我能应对吗？\n\n另外，试试这个呼吸技巧：\n• 吸气4秒（想象闻花香）\n• 屏气7秒\n• 呼气8秒（想象吹蜡烛）\n• 重复4次\n\n记住，焦虑不会永远持续。你比你想象的更强大，更有能力应对挑战。现在最让你焦虑的是什么？我们可以一步步分析它。",

    "我能感受到你内心的不安。焦虑往往让我们感觉失去控制，但实际上，学会与焦虑共处是一项重要的生活技能。\n\n首先，让我们重新认识焦虑：它不是你的敌人，而是一个过度保护的朋友。它的本意是好的，只是方法有些极端。\n\n这里有一个'焦虑对话'的技巧：\n1. 当焦虑出现时，在心里对它说：'谢谢你想保护我'\n2. 然后问：'现在真的有危险吗？'\n3. 如果没有，告诉焦虑：'我现在是安全的，你可以休息了'\n4. 如果有真实的问题，问：'我现在能做什么？'\n\n身体放松也很重要：\n• 从脚趾开始，逐渐放松每个肌肉群\n• 想象紧张像水一样从身体流走\n• 在心里重复：'我的身体正在放松，我的心灵正在平静'\n\n你知道吗？很多成功的人都曾经历过焦虑，包括著名的演员、运动员和科学家。焦虑不会定义你，你有能力学会管理它。\n\n今天有什么具体的事情触发了你的焦虑吗？",
  ],

  stressed: [
    "我听到了你的压力信号。在现代社会，特别是作为学生，面临多重压力是很常见的。但重要的是，我们要学会健康地管理压力，而不是被它压垮。\n\n首先，让我们做一个压力评估：\n• 你的压力主要来源是什么？（学业、家庭期望、同伴关系、未来规划等）\n• 这些压力中，哪些是你可以控制的？\n• 哪些是你无法控制的？\n\n对于可控的压力，我们可以制定行动计划：\n1. 将大任务分解成小步骤\n2. 设定现实可行的目标\n3. 学会说'不'，避免过度承诺\n4. 建立优先级系统\n\n对于不可控的压力，我们需要学会接受和释放：\n• 练习深呼吸和冥想\n• 进行体育锻炼释放压力荷尔蒙\n• 保持充足睡眠（7-9小时）\n• 与朋友或家人分享感受\n\n记住这个重要原则：你不需要完美，你只需要尽力而为。压力往往来自于我们对自己过高的期望。\n\n现在，能告诉我你最大的压力源是什么吗？让我们一起找到具体的解决方案。",

    "压力就像是生活给我们的重量训练——适度的压力能让我们成长，但过度的压力会让我们受伤。现在最重要的是找到平衡点。\n\n让我分享一个'压力管理工具箱'：\n\n立即缓解（5分钟内）：\n• 深呼吸10次\n• 喝一杯温水\n• 做颈部和肩膀的拉伸\n• 听一首喜欢的歌\n\n短期缓解（30分钟内）：\n• 散步或轻度运动\n• 洗个热水澡\n• 和朋友聊天\n• 做一些创意活动（画画、写作等）\n\n长期管理：\n• 建立规律的作息时间\n• 学习时间管理技巧\n• 培养兴趣爱好\n• 定期进行自我反思\n\n还有一个很重要的概念叫'压力免疫'：\n就像身体需要锻炼来增强免疫力一样，我们的心理也需要逐渐适应压力。每次成功应对压力，你都在变得更强大。\n\n你现在最希望改变的是什么？是减少压力源，还是提高应对压力的能力？我们可以从最容易的地方开始。",

    "感受到压力说明你是一个有责任心、在乎结果的人，这本身是很好的品质。但我们需要确保这种在乎不会变成负担。\n\n让我们用一个新的视角来看待压力：\n压力 = 需求 - 资源\n\n这意味着我们可以从两个方向来减少压力：\n1. 减少不必要的需求（学会拒绝、降低完美主义标准）\n2. 增加可用资源（技能、支持系统、时间管理等）\n\n这里有一个'压力日记'的方法：\n• 每天记录3个主要压力源\n• 评估每个压力的紧急性（1-10分）\n• 评估每个压力的重要性（1-10分）\n• 只专注于高重要性的事情\n• 对低重要性的事情学会放手\n\n身体层面的压力管理也很重要：\n• 压力会消耗B族维生素，多吃全谷物\n• 镁有助于肌肉放松，可以吃些坚果\n• 避免过多咖啡因，它会加剧焦虑\n• 保持水分充足，脱水会增加压力感\n\n最后，记住这句话：'你无法控制发生什么，但你可以控制如何回应。'\n\n今天有什么事情让你感到特别有压力？让我们一起分析一下它的重要性和紧急性。",
  ],

  tired: [
    "疲惫不仅仅是身体的信号，也是心理的信号。在快节奏的生活中，我们常常忽视了内心的疲惫。感谢你愿意承认和表达这种感受。\n\n让我们先区分一下疲惫的类型：\n\n身体疲惫：\n• 缺乏睡眠\n• 营养不良\n• 缺乏运动或过度运动\n• 疾病或身体不适\n\n心理疲惫：\n• 长期压力\n• 情绪负担过重\n• 缺乏成就感\n• 人际关系问题\n\n精神疲惫：\n• 缺乏目标和意义\n• 重复性的生活\n• 创造力被压抑\n• 价值观冲突\n\n针对不同类型的疲惫，我们需要不同的恢复策略：\n\n身体恢复：\n• 保证7-9小时优质睡眠\n• 规律饮食，多吃新鲜蔬果\n• 适度运动，哪怕是10分钟散步\n• 多喝水，减少咖啡因\n\n心理恢复：\n• 学会说'不'，设定边界\n• 寻求支持，不要独自承担\n• 练习感恩，关注积极面\n• 允许自己休息，不感到内疚\n\n精神恢复：\n• 重新连接你的价值观和目标\n• 尝试新的活动或爱好\n• 花时间在大自然中\n• 进行有意义的对话\n\n你觉得你的疲惫主要属于哪种类型？让我们找到最适合你的恢复方法。",

    "疲惫是身心在告诉我们：'我需要休息和关爱。'这是一个重要的信号，不应该被忽视或强行推开。\n\n我想和你分享一个概念叫'能量管理'：\n\n就像手机电池一样，我们的能量也有充电和耗电的过程。了解什么给你充电，什么让你耗电，是管理疲惫的关键。\n\n充电活动（因人而异）：\n• 独处时间 vs 社交时间\n• 安静活动 vs 刺激活动\n• 创造性工作 vs 例行工作\n• 室内活动 vs 户外活动\n\n耗电活动：\n• 过度使用电子设备\n• 与负能量的人相处\n• 做不喜欢但必须做的事\n• 多任务处理\n\n这里有一个'微恢复'的概念：\n不需要等到完全筋疲力尽才休息，可以在一天中安排多个5-10分钟的微恢复时间：\n• 深呼吸几分钟\n• 看看窗外的风景\n• 听一首喜欢的歌\n• 做简单的伸展运动\n• 喝杯茶，专注于味觉\n\n还有一个重要提醒：疲惫有时是抑郁或焦虑的表现。如果休息后仍然持续疲惫，或者伴随情绪低落、失去兴趣等症状，建议寻求专业帮助。\n\n现在，你最渴望的是什么样的休息？是身体的放松，还是心灵的平静？",

    "我能感受到你现在的疲惫状态。疲惫往往是我们给予太多、接受太少的结果。现在是时候学会如何更好地照顾自己了。\n\n让我们做一个'疲惫根源分析'：\n\n1. 时间疲惫：是否总觉得时间不够用？\n   解决方案：时间审计，找出时间黑洞\n\n2. 决策疲惫：是否需要做太多选择？\n   解决方案：简化日常选择，建立例行程序\n\n3. 情绪疲惫：是否承担了太多他人的情绪？\n   解决方案：学会情绪边界，不做情绪垃圾桶\n\n4. 完美主义疲惫：是否对自己要求过高？\n   解决方案：接受'足够好'的标准\n\n5. 比较疲惫：是否总在和他人比较？\n   解决方案：专注自己的成长轨迹\n\n恢复能量的'RESTORE'方法：\n• R - Rest（休息）：给身体充足的睡眠\n• E - Exercise（运动）：适度的身体活动\n• S - Social（社交）：与支持你的人连接\n• T - Time（时间）：为自己留出独处时间\n• O - Outdoors（户外）：接触大自然\n• R - Recreation（娱乐）：做让你快乐的事\n• E - Eating（饮食）：营养均衡的饮食\n\n记住，照顾自己不是自私，而是必需。只有你自己状态好了，才能更好地面对生活的挑战。\n\n今天你能为自己做一件小小的关爱行为吗？哪怕只是早睡半小时或者吃一顿好饭？",
  ],

  angry: [
    "我能感受到你内心的愤怒。愤怒是一种强有力的情绪，它通常在我们感到不公平、被误解或边界被侵犯时出现。重要的是要理解，愤怒本身不是坏事——它是一个信号，告诉我们有什么需要被关注。\n\n首先，让我们做一个立即的愤怒管理练习：\n1. 停下来，深呼吸5次\n2. 数到10，如果还很愤怒就数到20\n3. 问自己：'我的愤怒想告诉我什么？'\n4. 识别愤怒背后的真实需求\n\n愤怒背后常见的需求：\n• 被理解和认可\n• 公平和正义\n• 尊重和尊严\n• 安全感\n• 自主权和控制感\n\n健康表达愤怒的方法：\n• 使用'我'的表达方式：'我感到...'而不是'你总是...'\n• 专注于具体行为，而不是人格攻击\n• 选择合适的时间和地点\n• 先处理情绪，再解决问题\n\n身体释放愤怒的方法：\n• 剧烈运动（跑步、打拳击袋）\n• 大声唱歌或呐喊（在安全的地方）\n• 快速写作，不考虑语法\n• 撕纸或捏压力球\n\n长期愤怒管理策略：\n• 识别愤怒的早期信号\n• 学习放松技巧\n• 培养同理心\n• 练习宽恕（为了自己的内心平静）\n\n你愿意分享是什么让你感到愤怒吗？让我们一起找到这种愤怒背后的真实需求。",

    "愤怒是一种非常人性化的情绪反应。它告诉我们有什么重要的东西受到了威胁或侵犯。关键不是消除愤怒，而是学会以建设性的方式处理它。\n\n让我们深入了解愤怒的机制：\n\n愤怒的三个层次：\n1. 表面愤怒：我们表现出来的愤怒\n2. 核心愤怒：真正的愤怒感受\n3. 底层情绪：愤怒下面的伤害、恐惧或失望\n\n很多时候，愤怒是其他情绪的保护层。比如：\n• 当我们感到受伤时，愤怒让我们感觉更有力量\n• 当我们感到恐惧时，愤怒让我们感觉更有控制\n• 当我们感到失望时，愤怒让我们感觉不那么脆弱\n\n这里有一个'愤怒日记'的技巧：\n每次感到愤怒时，记录：\n• 触发事件是什么？\n• 你的身体有什么感觉？\n• 你的想法是什么？\n• 愤怒的强度（1-10分）\n• 愤怒背后的真实感受是什么？\n\n转化愤怒的能量：\n愤怒包含巨大的能量，我们可以将这种能量转化为：\n• 解决问题的动力\n• 为正义而战的勇气\n• 设定边界的力量\n• 改变现状的决心\n\n沟通愤怒的技巧：\n• '当...的时候，我感到愤怒，因为我需要...'\n• 避免绝对化词语（总是、从不、每次）\n• 专注于行为的影响，而不是动机的猜测\n• 提出具体的改变请求\n\n现在，你能告诉我愤怒背后你真正需要的是什么吗？是被理解、被尊重，还是其他什么？",
  ],

  confused: [
    "困惑是成长的标志。当我们面临新的挑战、复杂的选择或者价值观冲突时，困惑是完全正常的反应。它表明你正在思考，正在成长，这是非常积极的。\n\n让我们用一个结构化的方法来处理困惑：\n\n1. 明确困惑的核心：\n• 你困惑的具体是什么？\n• 这个困惑涉及哪些方面？\n• 什么时候开始感到困惑的？\n\n2. 信息收集：\n• 你已经知道什么？\n• 你还需要了解什么？\n• 谁可以提供帮助或建议？\n\n3. 价值观澄清：\n• 什么对你最重要？\n• 你的核心价值观是什么？\n• 不同选择如何与你的价值观对齐？\n\n4. 选项分析：\n• 列出所有可能的选择\n• 每个选择的优缺点\n• 最好和最坏的可能结果\n\n5. 直觉检查：\n• 闭上眼睛，想象选择了某个选项\n• 你的身体感觉如何？\n• 你的内心感觉如何？\n\n处理困惑的心理技巧：\n• 接受不确定性是生活的一部分\n• 记住你不需要立即有所有答案\n• 相信你有能力处理未知的情况\n• 将困惑看作探索的机会\n\n有时候，困惑来自于：\n• 信息过载\n• 他人期望与自己想法的冲突\n• 对未来的过度担忧\n• 完美主义（想要找到'完美'答案）\n\n记住，很多成功的人都经历过深深的困惑期。困惑不是失败，而是成长的必经之路。\n\n你现在最困惑的是什么？让我们一步步来理清思路。",

    "困惑往往出现在我们人生的转折点——当旧的答案不再适用，新的答案还未清晰时。这是一个充满可能性的时刻，虽然不舒服，但也充满机遇。\n\n让我分享一个'困惑导航'的框架：\n\n第一步：暂停和呼吸\n• 不要急于找到答案\n• 给自己时间和空间\n• 深呼吸，让心情平静下来\n\n第二步：探索困惑的地图\n• 画一个思维导图，把所有相关因素写下来\n• 用不同颜色标记：事实、感受、担忧、希望\n• 看看是否有模式或主题出现\n\n第三步：寻求多元视角\n• 和信任的朋友或家人讨论\n• 阅读相关书籍或文章\n• 考虑不同年龄、背景的人会如何看待\n\n第四步：小步实验\n• 不需要做出最终决定\n• 可以先尝试小的步骤\n• 观察结果，调整方向\n\n第五步：信任过程\n• 相信答案会在适当的时候出现\n• 保持开放和好奇的心态\n• 记住困惑是智慧的开始\n\n困惑的积极面：\n• 它促使我们深入思考\n• 它开启新的可能性\n• 它帮助我们重新评估优先级\n• 它培养我们的适应能力\n\n应对困惑的日常练习：\n• 每天写下3个你确定知道的事情\n• 练习说'我不知道，但我愿意学习'\n• 将困惑重新框架为'有趣的挑战'\n• 庆祝小的进步和洞察\n\n有一句话我很喜欢：'在困惑中，我们最接近真理。'因为只有当我们承认不知道时，我们才真正开始学习。\n\n你的困惑让你学到了什么？有什么新的可能性开始浮现了吗？",
  ],

  lonely: [
    "孤独是人类最深层的情感体验之一。感到孤独并不意味着你有什么问题，而是说明你渴望连接和理解，这是非常人性化的需求。\n\n首先，让我们区分孤独和独处：\n• 独处是选择，孤独是感受\n• 独处可以是滋养的，孤独通常是痛苦的\n• 你可以在人群中感到孤独，也可以在独处时感到满足\n\n孤独的不同类型：\n\n1. 社交孤独：缺乏社交网络\n• 解决方案：参加兴趣小组、志愿活动、课外活动\n\n2. 情感孤独：缺乏深度连接\n• 解决方案：与现有朋友深化关系，学习脆弱性分享\n\n3. 存在孤独：感觉被世界误解\n• 解决方案：寻找有相似价值观的人，参与有意义的活动\n\n建立连接的策略：\n\n立即行动（今天就可以做）：\n• 给一个老朋友发消息\n• 对陌生人微笑或说'谢谢'\n• 参与在线社区讨论\n• 给家人打电话\n\n短期行动（这周可以做）：\n• 邀请同学一起学习或吃饭\n• 参加学校或社区活动\n• 加入兴趣小组或俱乐部\n• 做志愿者工作\n\n长期建设（持续进行）：\n• 培养真实的自己，吸引志同道合的人\n• 学习倾听和共情技巧\n• 练习脆弱性，分享真实感受\n• 建立和维护友谊的技能\n\n与自己建立连接：\n有时候，孤独来自于与自己的疏离。试试这些：\n• 每天花10分钟独处，不看手机\n• 写日记，与内心对话\n• 做自己喜欢的事情\n• 练习自我同情\n\n记住，质量比数量重要。一个真正理解你的朋友比一百个表面朋友更有价值。\n\n你觉得你的孤独主要属于哪种类型？让我们找到最适合你的连接方式。",

    "孤独感是青少年时期特别常见的体验。你正处在一个身份形成的关键时期，寻找'我的人群'是这个过程的自然部分。\n\n让我分享一些关于孤独的重要洞察：\n\n孤独的悖论：\n• 越是害怕孤独，越容易感到孤独\n• 越是急于建立连接，越可能推开他人\n• 真正的连接往往在我们不刻意寻找时出现\n\n孤独的礼物：\n虽然痛苦，但孤独也带来了：\n• 更深的自我了解\n• 独立思考的能力\n• 对他人孤独的同理心\n• 珍惜真正连接的能力\n\n建立有意义连接的原则：\n\n1. 真实性原则：\n• 做真实的自己，而不是你认为别人想要的样子\n• 分享你的真实兴趣和想法\n• 承认你的不完美\n\n2. 互惠性原则：\n• 既要分享，也要倾听\n• 既要寻求支持，也要提供支持\n• 关注他人的需求和感受\n\n3. 耐心原则：\n• 深度友谊需要时间建立\n• 不要因为一次拒绝就放弃\n• 允许关系自然发展\n\n4. 多样性原则：\n• 不同的朋友满足不同的需求\n• 不要期望一个人满足所有社交需求\n• 珍惜各种类型的连接\n\n应对孤独的日常练习：\n\n晨间练习：\n• 想象今天会遇到的人\n• 设定一个小的社交目标\n• 提醒自己你值得被爱和理解\n\n晚间反思：\n• 回顾今天的社交互动\n• 感恩那些关心你的人\n• 原谅自己的社交'失误'\n\n创造连接的机会：\n• 在课堂上主动参与讨论\n• 在食堂邀请独自吃饭吃饭的同学\n• 参加学校的社团活动\n• 在社交媒体上真诚地互动\n\n记住，每个人都曾经感到孤独，包括那些看起来很受欢迎的人。你的孤独感不会永远持续，而且它正在教会你如何建立更深层的连接。\n\n今天你能做一件小事来减少孤独感吗？哪怕只是对某人真诚地微笑？",
  ],

  default: [
    "感谢你愿意和我分享你的感受。每一种情绪都有它存在的意义，都值得被认真对待。无论你现在经历什么，请记住你并不孤单。\n\n情绪就像天气一样，会有变化。有时是阳光明媚，有时是乌云密布，有时是暴风雨，但天气总会变化，情绪也是如此。\n\n这里有一些通用的情绪管理技巧：\n\n1. 情绪命名：\n• 尽可能具体地描述你的感受\n• 使用情绪词汇表来扩展你的情绪词汇\n• 记住，你可以同时体验多种情绪\n\n2. 身体觉察：\n• 注意情绪在身体中的感觉\n• 深呼吸，让身体放松\n• 做一些轻柔的伸展运动\n\n3. 思维观察：\n• 注意情绪带来的想法\n• 问自己：这些想法是事实还是观点？\n• 尝试从不同角度看待情况\n\n4. 自我关怀：\n• 对自己说话像对待好朋友一样温柔\n• 做一些让自己感到舒适的事情\n• 提醒自己：这种感觉是暂时的\n\n5. 寻求支持：\n• 与信任的人分享你的感受\n• 记住寻求帮助是勇敢的表现\n• 考虑专业帮助如果需要的话\n\n你知道吗？能够识别和表达情绪是一种重要的生活技能，叫做情绪智力。你正在练习这种技能，这很了不起。\n\n现在，你最需要的是什么？是有人倾听，是实用的建议，还是只是想知道有人关心你？我在这里，愿意以任何方式支持你。",

    "我很感激你选择在这里表达你的感受。这需要勇气，也显示了你对自己心理健康的关注，这是非常积极的。\n\n每个人的情绪体验都是独特的，就像指纹一样。没有'正确'或'错误'的感受方式，只有你真实的体验。重要的是学会与你的情绪和谐相处。\n\n让我分享一个叫做'情绪冲浪'的概念：\n\n想象情绪像海浪一样：\n• 它们会升起，达到顶峰，然后消退\n• 抵抗海浪会让你被冲倒\n• 学会冲浪意味着与海浪一起移动\n• 即使是最大的海浪也会最终平息\n\n情绪冲浪的步骤：\n1. 注意情绪的到来（海浪开始形成）\n2. 观察它的强度和特质（海浪的大小和形状）\n3. 呼吸并保持平衡（站稳在冲浪板上）\n4. 与情绪一起移动，不抵抗（顺着海浪滑行）\n5. 观察它自然消退（海浪回到平静）\n\n建立情绪韧性的方法：\n\n日常基础：\n• 充足的睡眠（7-9小时）\n• 规律的运动\n• 营养均衡的饮食\n• 限制酒精和咖啡因\n\n心理工具：\n• 正念冥想练习\n• 感恩日记\n• 积极的自我对话\n• 设定现实的期望\n\n社交支持：\n• 培养支持性的关系\n• 学会表达需求\n• 提供和接受帮助\n• 参与有意义的活动\n\n记住，情绪健康不是没有负面情绪，而是能够健康地处理所有情绪。你正在学习这个重要的生活技能。\n\n今天有什么小事让你感到一丝温暖或希望吗？有时候，关注这些小小的积极时刻可以帮助我们建立情绪韧性。",

    "你的每一种感受都是有价值的，都值得被听见和理解。在这个快节奏的世界里，能够停下来关注自己的内心状态是一种智慧。\n\n我想和你分享一个重要的概念：情绪粒度。这是指我们区分和描述不同情绪的能力。研究表明，情绪粒度越高的人，心理健康水平越好。\n\n提高情绪粒度的练习：\n\n1. 情绪词汇扩展：\n• 不只是说'好'或'不好'\n• 学习更多情绪词汇：兴奋、满足、平静、焦虑、失望、愤怒等\n• 使用强度词汇：轻微的担忧 vs 深度的恐惧\n\n2. 身体扫描：\n• 从头到脚注意身体的感觉\n• 紧张在哪里？放松在哪里？\n• 情绪如何在身体中表现？\n\n3. 情绪日记：\n• 每天记录3-5种不同的情绪\n• 注意触发因素\n• 观察情绪的变化模式\n\n4. 情绪检查：\n• 每天几次问自己：'我现在感觉如何？'\n• 不要判断，只是观察\n• 注意情绪的细微变化\n\n情绪的智慧：\n每种情绪都有它的信息：\n• 恐惧告诉我们注意安全\n• 愤怒告诉我们边界被侵犯\n• 悲伤告诉我们失去了重要的东西\n• 快乐告诉我们什么对我们有益\n• 焦虑告诉我们需要准备\n\n与情绪建立健康关系的原则：\n• 接受而不是抵抗\n• 观察而不是认同\n• 表达而不是压抑\n• 学习而不是判断\n\n记住，你不是你的情绪。你是体验情绪的人。就像天空不是云朵，而是云朵经过的空间一样。\n\n现在，如果你愿意，可以告诉我更多关于你今天的感受。我在这里倾听，不带任何判断，只有理解和支持。",
  ],
}

// 关键词匹配
const emotionKeywords = {
  sad: ["难过", "伤心", "悲伤", "沮丧", "失落", "痛苦", "哭", "眼泪"],
  anxious: ["焦虑", "紧张", "担心", "害怕", "恐惧", "不安", "忧虑", "惊慌"],
  stressed: ["压力", "累", "疲惫", "忙", "紧张", "负担", "重", "喘不过气"],
  tired: ["疲惫", "累", "困", "没精神", "无力", "疲劳", "倦怠"],
  angry: ["愤怒", "生气", "气愤", "恼火", "烦躁", "暴躁", "火大", "讨厌"],
  confused: ["困惑", "迷茫", "不知道", "不明白", "纠结", "犹豫", "不确定"],
  lonely: ["孤独", "寂寞", "孤单", "没朋友", "一个人", "孤立", "被忽视"],
}

// 定义情绪类型
type EmotionType = 'sad' | 'anxious' | 'stressed' | 'tired' | 'angry' | 'confused' | 'lonely' | 'default';

function detectEmotion(text: string): EmotionType {
  const lowerText = text.toLowerCase()

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some((keyword) => lowerText.includes(keyword))) {
      return emotion as EmotionType
    }
  }

  return "default"
}

function getAIResponse(userMessage: string): string {
  const emotion = detectEmotion(userMessage)
  const responses = aiResponses[emotion]
  return responses[Math.floor(Math.random() * responses.length)]
}

export default function Chat() {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "你好！我是你的心理健康助手小暖。今天你感觉怎么样？有什么想和我分享的吗？",
      isUser: false,
      time: "14:30",
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const now = new Date()
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

      // 添加用户消息
      const userMessage = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
        time,
      }

      setMessages((prev) => [...prev, userMessage])
      const currentInput = inputText
      setInputText("")
      setIsTyping(true)

      // 模拟AI思考时间
      setTimeout(() => {
        const responseTime = new Date()
        const respTime = `${responseTime.getHours()}:${responseTime.getMinutes().toString().padStart(2, "0")}`

        const aiResponse = getAIResponse(currentInput)

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: aiResponse,
            isUser: false,
            time: respTime,
          },
        ])
        setIsTyping(false)
        
        // 确保滚动到底部
        setTimeout(() => {
          scrollToBottom()
        }, 100)
      }, 1500)
    }
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#FFF2E2" }}>
      <header className="px-5 py-3 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-3 text-[#6b4423]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#ff9f43] rounded-full flex items-center justify-center text-white mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <div>
              <div className="font-medium text-[#6b4423]">心理助手小暖</div>
              <div className="text-xs text-green-500">在线</div>
            </div>
          </div>
        </div>
        <button className="text-[#6b4423]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-auto p-4 pb-32">
        <div className="space-y-0 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className={`flex ${message.isUser ? "justify-end" : "justify-start"} items-start`}>
                {!message.isUser && (
                  <div className="w-10 h-10 bg-[#ff9f43] rounded-full flex items-center justify-center text-white mr-2 mt-1 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </div>
                )}

                <div className="max-w-[75%] flex flex-col relative">
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isUser
                        ? "bg-[#ff9f43] text-white rounded-tr-none"
                        : "bg-[#ffefd5] text-[#6b4423] rounded-tl-none"
                    } break-words whitespace-pre-wrap`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {message.text}
                  </div>
                  
                  {/* 添加消息气泡尾巴 - 只为AI消息添加 */}
                  {!message.isUser && (
                    <div className="absolute bottom-0 left-0 w-0 h-0" style={{ 
                      borderTop: '10px solid transparent',
                      borderRight: '10px solid #ffefd5',
                      left: '-5px'
                    }}></div>
                  )}
                </div>

                {message.isUser && (
                  <div className="w-10 h-10 bg-[#ff9f43] rounded-full flex items-center justify-center ml-2 mt-1 text-white flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
              </div>
              
              {/* 消息时间戳 */}
              <div className={`text-xs text-[#8b6b4f] ${message.isUser ? "text-right mr-14" : "text-left ml-14"}`}>
                {message.time}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="mb-2">
              <div className="flex justify-start items-start">
                <div className="w-10 h-10 bg-[#ff9f43] rounded-full flex items-center justify-center text-white mr-2 mt-1 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <div className="bg-[#ffefd5] text-[#8b6b4f] p-3 rounded-2xl rounded-tl-none relative">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#8b6b4f] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#8b6b4f] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-[#8b6b4f] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  
                  {/* 添加消息气泡尾巴 */}
                  <div className="absolute bottom-0 left-0 w-0 h-0" style={{ 
                    borderTop: '10px solid transparent',
                    borderRight: '10px solid #ffefd5',
                    left: '-5px'
                  }}></div>
                </div>
              </div>
              
              {/* 消息时间戳 */}
              <div className="text-xs text-[#8b6b4f] text-left ml-14">
                {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, "0")}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-10" />
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-3 bg-white border-t">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <button className="text-[#8b6b4f] p-2">
            <Smile className="h-5 w-5" />
          </button>
          <button className="text-[#8b6b4f] p-2">
            <ImageIcon className="h-5 w-5" />
          </button>
          <Input
            placeholder="好久不见 甚是想念..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 h-10 rounded-full border-2 border-[#ffe0b2] focus:border-[#ff9f43] focus:ring-2 focus:ring-[#ff9f43]/20 bg-white shadow-sm"
            disabled={isTyping}
          />
          {inputText.trim() ? (
            <Button
              onClick={handleSendMessage}
              className="rounded-full bg-[#ff9f43] h-10 px-6 py-0 text-white font-medium"
              disabled={isTyping}
            >
              发送
            </Button>
          ) : (
            <Button className="rounded-full bg-[#ff9f43] h-10 w-10 p-0">
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
