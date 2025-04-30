// api-service.js - API服务与对话历史管理

// 对话历史管理器
const ConversationManager = {
    // 对话历史
    history: {
        // 基础信息
        theme: '',         // 主题
        supplement: '',    // 补充主题
        details: '',       // 用户详细问题
        numbers: '',       // 用户选择的三个数字

        // 对话历史
        queries: [],       // 用户的追问数组
        results: [],       // 系统的回答数组

        // 控制参数
        MAX_QUERIES: 3,    // 最大追问次数
        currentQueryIndex: 0, // 当前追问索引
        solution: '',      // 解决方案
        
        // Step 5相关
        tipsQueries: [],        // 解忧Tips追问数组
        tipsResults: [],        // 解忧Tips回答数组
        MAX_TIPS_QUERIES: 3,    // 解忧Tips最大追问次数
        currentTipsIndex: 0     // 解忧Tips当前追问索引
    },

    // 初始化对话历史
    initHistory() {
        this.resetHistory();
        
        // 设置基础信息
        this.history.theme = AppCore.AppState.currentTheme;
        this.history.supplement = AppCore.AppState.themeDetail || '';
        this.history.details = AppCore.AppState.userDetails;
        this.history.numbers = AppCore.AppState.numbers;
        
        console.log('Initialized conversation history:', this.history);
        return this;
    },

    // 重置对话历史
    resetHistory() {
        this.history.theme = '';
        this.history.supplement = '';
        this.history.details = '';
        this.history.numbers = '';
        this.history.queries = [];
        this.history.results = [];
        this.history.currentQueryIndex = 0;
        this.history.solution = '';
        
        // 重置Step 5相关数据
        this.history.tipsQueries = [];
        this.history.tipsResults = [];
        this.history.currentTipsIndex = 0;
        
        return this;
    },

    // 添加用户提问
    addQuery(query) {
        this.history.queries.push(query);
        return this;
    },

    // 添加系统回答
    addResult(result) {
        this.history.results.push(result);
        return this;
    },

    // 获取当前对话索引
    getCurrentIndex() {
        return this.history.currentQueryIndex;
    },

    // 增加当前对话索引
    incrementIndex() {
        this.history.currentQueryIndex++;
        return this;
    },

    // 检查是否达到最大追问次数
    hasReachedMaxQueries() {
        console.log(`检查追问次数: 当前=${this.history.currentQueryIndex}, 最大=${this.history.MAX_QUERIES}`);
        return this.history.currentQueryIndex >= this.history.MAX_QUERIES;
    },

    // 设置解决方案
    setSolution(solution) {
        this.history.solution = solution;
        return this;
    },

    // 获取解决方案
    getSolution() {
        return this.history.solution;
    },

    // 添加Tips追问
    addTipsQuery(query) {
        this.history.tipsQueries.push(query);
        return this;
    },

    // 添加Tips回答
    addTipsResult(result) {
        this.history.tipsResults.push(result);
        return this;
    },

    // 获取当前Tips索引
    getCurrentTipsIndex() {
        return this.history.currentTipsIndex;
    },

    // 增加当前Tips索引
    incrementTipsIndex() {
        this.history.currentTipsIndex++;
        return this;
    },

    // 检查是否达到最大Tips追问次数
    hasReachedMaxTipsQueries() {
        console.log(`检查Tips追问次数: 当前=${this.history.currentTipsIndex}, 最大=${this.history.MAX_TIPS_QUERIES}`);
        return this.history.currentTipsIndex >= this.history.MAX_TIPS_QUERIES;
    }
};

// API服务
const ApiService = {
    // 构建初始提示词
    buildInitialPrompt() {
        const { theme, supplement, details, numbers } = ConversationManager.history;
        
        const prompt = `用户想咨询${theme}${supplement}方面，最近遇到的困扰是${details}，请你运用数字起卦方法中后天八卦的相关理论，用数字${numbers}占卜一挂，帮用户解读下卦象，并根据咨询方向和困扰，做针对性的深入解读，注意最后的落脚点要鼓励用户，给予用户积极的正能量。`;
        
        console.log('Initial prompt:', prompt);
        return prompt;
    },

    // 构建追问提示词
    buildFollowUpPrompt() {
        const { theme, supplement, details, numbers, queries, results, currentQueryIndex } = ConversationManager.history;
        
        let prompt = `用户想咨询${theme}${supplement}方面，最近遇到的困扰是${details}，使用数字${numbers}进行了起卦。\n\n以下是之前的对话历史：\n解读：${results[0]}\n`;
        
        // 添加之前的对话历史
        for (let i = 0; i < currentQueryIndex; i++) {
            prompt += `\n用户：${queries[i]}\n解读：${results[i+1]}\n`;
        }
        
        // 添加当前问题
        prompt += `\n用户：${queries[currentQueryIndex]}\n`;
        
        prompt += `\n请继续解答用户的问题，保持积极正能量的引导，同时与之前的卦象解读保持一致性。`;
        
        console.log('Follow-up prompt:', prompt);
        return prompt;
    },

    // 构建解忧Tips提示词
    buildTipsPrompt() {
        const { theme, supplement, details, numbers, queries, results } = ConversationManager.history;
        
        let prompt = `用户想咨询${theme}${supplement}方面，最近遇到的困扰是${details}，使用数字${numbers}进行了起卦。\n\n以下是之前的对话历史：\n解读：${results[0]}\n`;
        
        // 添加之前的对话历史
        for (let i = 0; i < Math.min(queries.length, results.length - 1); i++) {
            prompt += `\n用户：${queries[i]}\n解读：${results[i+1]}\n`;
        }
        
        prompt += `\n根据过往交流历史，请给用户提供5条左右具体的解忧小建议，可以从以下方面选择：幸运色、幸运数字、妆容建议、穿搭建议、宜情小物、适宜运动、书籍推荐、自媒体博主推荐等。\n\n给出的建议应当简洁明了，每条建议2-3句话为宜，目的是将用户的不良情绪转移，并给予积极的行动指南。同时与之前的卦象解读保持一致性。`;
        
        console.log('Tips prompt:', prompt);
        return prompt;
    },

    // 构建Tips追问提示词
    buildTipsFollowUpPrompt() {
        const { theme, supplement, details, numbers, queries, results, tipsQueries, tipsResults, currentTipsIndex } = ConversationManager.history;
        
        let prompt = `用户想咨询${theme}${supplement}方面，最近遇到的困扰是${details}，使用数字${numbers}进行了起卦。\n\n以下是之前的对话历史：\n解读：${results[0]}\n`;
        
        // 添加Step 4的对话历史
        for (let i = 0; i < Math.min(queries.length, results.length - 1); i++) {
            prompt += `\n用户：${queries[i]}\n解读：${results[i+1]}\n`;
        }
        
        // 添加之前的Tips历史
        prompt += `\n之前的解忧小Tips为：\n${tipsResults[0]}\n`;
        
        // 添加之前的Tips追问历史
        for (let i = 0; i < currentTipsIndex; i++) {
            prompt += `\n用户追问：${tipsQueries[i]}\n回答：${tipsResults[i+1]}\n`;
        }
        
        // 添加当前问题
        prompt += `\n用户现在的问题是：${tipsQueries[currentTipsIndex]}\n`;
        
        prompt += `\n请继续为用户提供积极的建议，保持与之前卦象解读和解忧Tips的一致性。`;
        
        console.log('Tips follow-up prompt:', prompt);
        return prompt;
    },

    // 调用DeepSeek API
    async callDeepSeekApi(prompt) {
        // TODO: 实现真实API调用
        // 目前使用模拟API调用
        return this.mockDeepSeekApiCall(prompt);
    },

    // 模拟DeepSeek API调用
    mockDeepSeekApiCall(prompt) {
        console.log('Mock API call with prompt:', prompt);
        
        // 根据不同场景返回不同的模拟结果
        if (prompt.includes('运用数字起卦方法')) {
            // 初始解读
            return `根据您提供的数字${ConversationManager.history.numbers}，我为您占卜出的是"坎卦"。

坎卦象征着水，代表着险难与隐藏的机遇。在${ConversationManager.history.theme}方面，您目前确实面临一些挑战，感到压力与不确定性。水既能载舟，也能覆舟，这暗示着当前困境中蕴含着转机。

针对您提到的"${ConversationManager.history.details}"，卦象显示：
1. 您当前处于一个需要谨慎决策的阶段，感到犹豫不决是正常的
2. 外界环境确实存在一些不确定因素，使您感到焦虑
3. 在坎卦中，中爻为阳，表示内心仍有坚定的力量可以仰仗

建议：
- 保持冷静和耐心，不要急于求成
- 寻求值得信任的人的建议和支持
- 相信自己的内在智慧，它会引导您穿越难关

请记住，水总是能找到出路，无论多么险阻的山谷。这个卦象提醒您，困难是暂时的，只要保持坚韧和灵活，必将迎来柳暗花明的一天。`;
        } else if (prompt.includes('解忧小Tips') || prompt.includes('解忧小建议')) {
            // 解忧Tips
            const tipsMockResponses = [
                `根据您的卦象和问题，我为您准备了几条解忧小Tips：

1. 幸运色：深蓝色，象征坎卦中水的智慧与深度，建议在工作环境中增加这个颜色元素，有助于增强思考能力和冷静决策。

2. 幸运数字：6，在易经中代表阴爻，有助于平衡您当前略显紧张的状态。可以在日常生活中多留意这个数字的出现。

3. 穿搭建议：选择深蓝或黑色为主色调的服装，搭配少量明亮色彩点缀，展现沉稳与内在力量，增强自信感。

4. 宜情小物：一个小型流水摆件或水晶装饰放在工作空间，可以帮助调节情绪，提醒自己像水一样保持灵活适应的态度。

5. 书籍推荐：《活法》（稻盛和夫著），讲述如何在困境中保持正确心态；或《反脆弱》，探讨如何从压力中获益成长。

希望这些建议能帮助您调整状态，以更积极的心态面对当前的挑战。记住，像水一样，总能找到前进的方向。`,

                `您的问题很好，我再补充几条针对性的建议：

1. 自媒体推荐：可以关注"X博士"，他的内容关于职场心理学和压力管理，与您当前面临的困境很契合。

2. 日常习惯：每晚睡前10分钟写感恩日记，记录当天3件值得感谢的事情，有助于培养积极思维模式。

3. 环境调整：在工作区域放置一些绿色植物，研究表明它们能减轻压力，改善心情，提高专注力。

4. 人际交往：学习"深度倾听"技巧，在与同事交流时真正专注于对方的表达，这往往能改善人际关系。

5. 运动建议：尝试太极或瑜伽等注重呼吸和冥想的活动，每天15-20分钟，帮助释放压力，找回内心平静。

这些小建议都与坎卦所象征的"内省"和"智慧"相呼应，希望能帮助您走出当前困境。`,

                `非常理解您的顾虑，再分享几个可能对您有帮助的建议：

1. 心理调适：尝试"5-4-3-2-1"感官练习，当感到焦虑时识别周围的事物，这个简单练习能迅速将您拉回当下，缓解焦虑。

2. 职场技巧：建立"成就文件夹"，收集您的工作成就和积极反馈，当自信心受挫时翻阅，提醒自己的能力和价值。

3. 人际沟通：采用"三明治法则"给出反馈，即在批评意见前后各加一层肯定，能有效减少工作中的冲突。

4. 时间管理：尝试番茄工作法，每专注工作25分钟后休息5分钟，能提高效率，减少压力感和拖延倾向。

5. 营养建议：增加富含Omega-3的食物摄入，如深海鱼类、核桃等，研究表明这些食物对缓解压力和焦虑有积极作用。

坎卦提醒我们，每个低谷都孕育着上升的机会。希望这些建议助您度过挑战期。`
            ];

            // 如果是Tips追问，返回第2或第3条回答
            if (prompt.includes('用户追问') || prompt.includes('用户现在的问题')) {
                const index = (ConversationManager.history.currentTipsIndex % (tipsMockResponses.length - 1)) + 1;
                return tipsMockResponses[index];
            } else {
                // 首次Tips请求，返回第1条回答
                return tipsMockResponses[0];
            }
        } else {
            // 普通追问解读
            const followUpResponses = [
                `您的问题很有洞察力。结合坎卦的含义和您的情况，确实可以更深入地解读。

水的特性是向下流动，寻找最低点，这暗示着在当前阶段，您需要保持谦逊的态度，不要急于追求表面的成功。有时候，看似退步的选择，实际上是在为未来的跃升积蓄力量。

坎卦中的重水意象提醒您，现在可能是反思和内省的好时机。水能映照万物，却很少被人注意自身的价值，这提示您可能需要重新认识自我价值，而不仅仅依赖外界的认可。

请相信，当您经历了这段"山重水复疑无路"的阶段后，必然会迎来"柳暗花明又一村"的喜悦。坚持下去，答案就在前方等着您。`,
                
                `这个问题触及了坎卦的另一层含义。坎为中男，代表中年男子所具有的智慧与担当。无论您的实际年龄或性别如何，这个卦象都在提醒您，成长必然伴随着责任和考验。

在具体的${ConversationManager.history.theme}方面，当前的困难实际上是一种磨砺，是让您成长为更坚强、更有智慧的人的必经之路。就像水能够穿石，不是因为力量强大，而是因为持之以恒。

另外，坎卦也象征着心的澄明。当外界环境复杂多变时，保持内心的清明就显得尤为重要。建议您在这段时期多进行冥想或者其他能够平静心灵的活动，这将帮助您找到面对困境的智慧。

相信自己，这段考验终将成为您人生中宝贵的财富。`,
                
                `坎卦与您提出的这个问题有着深刻的联系。在易经中，坎为水，为陷阱，但同时也代表着智慧与机遇。

您可能感到当前处于低谷，但请记住，正是在最深的山谷中，我们才能找到最珍贵的宝藏。坎卦提醒我们，看似危险的处境往往蕴含着转机。

从实际行动层面，建议您：
1. 不要急于做出重大决定，给自己足够的时间思考
2. 寻求专业人士或长辈的建议，他们的经验可能对您有所启发
3. 保持警觉但不要过度焦虑，理性分析当前形势

最后，请记住一句古语："山不过来，我就过去"。困难无法改变，那就改变我们面对困难的态度。我相信，凭借您的智慧和勇气，必定能够化险为夷，迎来新的机遇。`
            ];
            
            const index = ConversationManager.history.currentQueryIndex % followUpResponses.length;
            return followUpResponses[index];
        }
    }
};

// 导出模块
window.ApiService = ApiService;
window.ConversationManager = ConversationManager; 