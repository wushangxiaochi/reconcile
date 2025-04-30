// numbers-project.js - 数字起卦解忧方案模块

// 数字起卦解忧方案管理
const NumbersProject = {
    // Step 3: 数字选择
    proceedToNumbersStep3() {
        console.log('Proceeding to Numbers Project Step 3');
        AppCore.AppState.chatStep = 3;
        
        // 显示系统消息1
        setTimeout(() => {
            AppCore.UIUtil.showTypingIndicator();
            
            setTimeout(() => {
                AppCore.UIUtil.removeTypingIndicator();
                AppCore.UIUtil.addMessage('system', '好，为您抽取三个数字');
                
                // 延迟显示系统消息2（随机数字）
                setTimeout(() => {
                    // 生成三个1-9之间的随机数字
                    const randomNumbers = [
                        Math.floor(Math.random() * 9) + 1,
                        Math.floor(Math.random() * 9) + 1,
                        Math.floor(Math.random() * 9) + 1
                    ];
                    
                    const numbersStr = randomNumbers.join(',');
                    AppCore.UIUtil.addMessage('system', numbersStr);
                    
                    // 记录系统生成的数字
                    AppCore.AppState.numbers = numbersStr;
                    
                    // 显示功能胶囊
                    this.showNumbersStep3Capsules(numbersStr);
                }, 2500);
            }, 1500);
        }, 500);
    },

    // 显示数字起卦Step3的功能胶囊
    showNumbersStep3Capsules(generatedNumbers) {
        const capsulesDiv = document.createElement('div');
        capsulesDiv.className = 'function-capsules-container'; // 使用新的容器类

        // 创建功能胶囊区域
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'function-capsules';
        
        // 好的（使用生成的数字）
        const acceptCapsule = document.createElement('div');
        acceptCapsule.className = 'function-capsule';
        const acceptButton = document.createElement('button');
        acceptButton.textContent = '好的';
        acceptButton.addEventListener('click', () => {
            // 使用系统生成的数字
            AppCore.AppState.numbers = generatedNumbers;
            console.log('Using generated numbers:', AppCore.AppState.numbers);
            
            // 添加用户消息
            AppCore.UIUtil.addMessage('user', AppCore.AppState.numbers);
            
            // 进入Step 4
            this.proceedToStep4();
        });
        acceptCapsule.appendChild(acceptButton);
        
        // 不了，自行输入
        const inputCapsule = document.createElement('div');
        inputCapsule.className = 'function-capsule';
        const inputButton = document.createElement('button');
        inputButton.textContent = '不了，自行输入';
        inputButton.addEventListener('click', () => {
            console.log('User will input numbers');
            
            // 显示输入框提示（通过CSS已可见）
            document.querySelector('.input-hint').style.display = 'inline-block';
            
            // 设置输入框接收数字
            this.setupNumbersInput();
        });
        inputCapsule.appendChild(inputButton);
        
        buttonsDiv.appendChild(acceptCapsule);
        buttonsDiv.appendChild(inputCapsule);
        capsulesDiv.appendChild(buttonsDiv);
        
        // 添加提示内容（默认隐藏）
        const hintDiv = document.createElement('div');
        hintDiv.className = 'input-hint';
        hintDiv.textContent = '请输入三个数字，1~9之间，逗号分隔';
        hintDiv.style.display = 'none'; // 默认隐藏
        capsulesDiv.appendChild(hintDiv);
        
        AppCore.UI.chatMessages.appendChild(capsulesDiv);
        
        // 自动滚动到底部
        AppCore.UI.chatMessages.scrollTop = AppCore.UI.chatMessages.scrollHeight;
    },

    // 设置输入框接收数字
    setupNumbersInput() {
        // 显示提示
        document.querySelector('.input-hint').style.display = 'inline-block';
        
        // 定义处理函数
        AppCore.AppState.handleNumbersInput = function() {
            const inputValue = AppCore.UI.chatInput.value.trim();
            if (inputValue === '') return;
            
            // 添加用户消息
            AppCore.UIUtil.addMessage('user', inputValue);
            
            // 验证输入的数字格式
            if (AppCore.Helpers.validateNumbersInput(inputValue)) {
                // 记录用户输入的数字
                AppCore.AppState.numbers = inputValue;
                console.log('User input numbers:', AppCore.AppState.numbers);
                
                // 清空输入框
                AppCore.UI.chatInput.value = '';
                
                // 移除自定义事件监听器
                AppCore.UI.sendButton.removeEventListener('click', AppCore.AppState.handleNumbersInput);
                AppCore.UI.chatInput.removeEventListener('keypress', AppCore.AppState.handleNumbersInputKeyPress);
                
                // 进入Step 4
                NumbersProject.proceedToStep4();
            } else {
                // 清空输入框
                AppCore.UI.chatInput.value = '';
                
                // 提示用户输入正确格式
                setTimeout(() => {
                    AppCore.UIUtil.addMessage('system', '请输入三个数字，1~9之间，逗号分隔');
                }, 500);
            }
        };
        
        AppCore.AppState.handleNumbersInputKeyPress = function(e) {
            if (e.key === 'Enter') {
                AppCore.AppState.handleNumbersInput();
            }
        };
        
        // 移除所有可能存在的事件监听器
        AppCore.UI.sendButton.removeEventListener('click', ChatManager.sendMessage);
        AppCore.UI.chatInput.removeEventListener('keypress', AppCore.Helpers.handleKeyPress);
        
        // 添加我们的事件监听器
        AppCore.UI.sendButton.addEventListener('click', AppCore.AppState.handleNumbersInput);
        AppCore.UI.chatInput.addEventListener('keypress', AppCore.AppState.handleNumbersInputKeyPress);
    },

    // Step 4: 卦象解读
    proceedToStep4() {
        console.log('Proceeding to Numbers Project Step 4');
        AppCore.AppState.chatStep = 4;
        
        // 准备对话历史数据
        ConversationManager.initHistory();
        console.log('初始化对话历史，当前追问次数:', ConversationManager.getCurrentIndex());
        
        // 显示正在解读提示
        this.showStepFourInitialMessage();
    },

    // 显示Step 4 初始消息
    showStepFourInitialMessage() {
        console.log('显示Step 4初始消息，准备第一次API调用');
        
        // 保存this引用
        const self = this;
        
        // 发送正在解读的消息
        setTimeout(() => {
            AppCore.UIUtil.addMessage('system', '好的，DeepSeek正在为您解读，请稍等片刻');
            
            // 模拟API调用
            setTimeout(async () => {
                console.log('执行初始API调用');
                // 实际项目中替换为真实API调用
                const result = await ApiService.callDeepSeekApi(ApiService.buildInitialPrompt());
                
                // 保存结果到对话历史
                ConversationManager.addResult(result);
                
                // 显示结果
                AppCore.UIUtil.addMessage('system', result);
                
                // 显示功能胶囊
                self.showStepFourCapsules();
                
                // 设置输入框事件监听
                self.setupStepFourInput();
                
                console.log('初始API调用完成，已设置事件监听器');
            }, 2000);
        }, 500);
    },

    // 显示Step 4功能胶囊
    showStepFourCapsules() {
        const capsulesDiv = document.createElement('div');
        capsulesDiv.className = 'function-capsules';
        
        // 解忧小Tips胶囊
        const tipsCapsule = document.createElement('div');
        tipsCapsule.className = 'function-capsule';
        const tipsButton = document.createElement('button');
        tipsButton.textContent = '解忧小Tips';
        tipsButton.addEventListener('click', () => {
            // 设置solution字段
            ConversationManager.setSolution('GiveMeTips');
            
            // 进入Step 5
            this.proceedToStep5();
        });
        tipsCapsule.appendChild(tipsButton);
        
        // 结合整体运势解忧胶囊
        const completeCapsule = document.createElement('div');
        completeCapsule.className = 'function-capsule';
        const completeButton = document.createElement('button');
        completeButton.textContent = '结合整体运势解忧';
        completeButton.addEventListener('click', () => {
            // 更改scheme字段
            AppCore.AppState.scheme = 'CompleteProject';
            
            // 进入Step 3
            ChatSteps.proceedToStep3();
        });
        completeCapsule.appendChild(completeButton);
        
        capsulesDiv.appendChild(tipsCapsule);
        capsulesDiv.appendChild(completeCapsule);
        AppCore.UI.chatMessages.appendChild(capsulesDiv);
        
        // 自动滚动到底部
        AppCore.UI.chatMessages.scrollTop = AppCore.UI.chatMessages.scrollHeight;
    },

    // 设置Step 4输入框事件监听
    setupStepFourInput() {
        console.log('设置Step 4输入框事件监听，当前步骤:', AppCore.AppState.chatStep);
        
        // 确保当前步骤是4
        if (AppCore.AppState.chatStep !== 4) {
            console.log('当前不是步骤4，不设置Step 4事件监听器');
            return;
        }
        
        // 保存this引用
        const self = this;
        
        // 先移除所有现有事件监听器，特别是ChatSteps的事件监听器
        this.removeAllEventListeners();
        
        // 定义Enter键处理函数
        const keyPressHandler = function(e) {
            if (e.key === 'Enter') {
                self.handleStepFourInput.call(self);
            }
        };
        
        // 先检查是否已达到最大追问次数
        if (ConversationManager.hasReachedMaxQueries()) {
            console.log('已达到最大追问次数，绑定特殊处理函数');
            // 如果已达到最大追问次数，添加特殊处理函数
            if (AppCore.UI.sendButton) {
                AppCore.UI.sendButton.addEventListener('click', function() {
                    if (AppCore.UI.chatInput.value.trim()) {
                        AppCore.UIUtil.addMessage('user', AppCore.UI.chatInput.value.trim());
                        AppCore.UI.chatInput.value = '';
                        setTimeout(() => {
                            AppCore.UIUtil.addMessage('system', '您已达到最大追问次数，请选择其他解忧方式。');
                            self.showStepFourCapsules();
                        }, 500);
                    }
                });
            }
        } else {
            // 正常追问处理函数 - 直接使用函数定义，而不是方法引用
            const handleClick = function() {
                self.handleStepFourInput.call(self);
            };
            
            // 绑定处理函数
            if (AppCore.UI.sendButton) {
                console.log('绑定正常追问处理函数');
                AppCore.UI.sendButton.addEventListener('click', handleClick);
            }
            
            if (AppCore.UI.chatInput) {
                AppCore.UI.chatInput.addEventListener('keypress', keyPressHandler);
            }
        }
        
        console.log('Step 4事件监听器设置完成，当前追问次数:', ConversationManager.getCurrentIndex());
    },

    // 处理Step 4用户输入
    handleStepFourInput() {
        console.log('执行handleStepFourInput，处理用户追问，当前步骤:', AppCore.AppState.chatStep);
        
        // 确保当前步骤是4
        if (AppCore.AppState.chatStep !== 4) {
            console.log('当前不是步骤4，不处理Step 4用户输入');
            return;
        }
        
        const userInput = AppCore.UI.chatInput.value.trim();
        if (!userInput) return;
        
        // 保存对象引用
        const self = this;
        
        // 检查是否达到最大追问次数
        if (ConversationManager.hasReachedMaxQueries()) {
            console.log('已达到最大追问次数');
            // 添加用户消息
            AppCore.UIUtil.addMessage('user', userInput);
            
            // 清空输入框
            AppCore.UI.chatInput.value = '';
            
            // 先移除所有事件监听器
            this.removeAllEventListeners();
            
            // 提示用户已经达到最大追问次数
            setTimeout(() => {
                // 给出明确提示
                AppCore.UIUtil.addMessage('system', '您已经进行了3次追问，达到了最大次数限制。建议您尝试其他解忧方式，比如"解忧小Tips"或"结合整体运势解忧"。');
                
                // 确保显示正确的功能胶囊
                self.showStepFourCapsules();
                
                // 重新绑定事件监听器，确保继续使用当前处理函数
                self.setupStepFourInput();
            }, 500);
            
            return;
        }
        
        // 检查必要的状态是否已设置
        if (!AppCore.AppState.numbers) {
            console.log('用户状态缺失：numbers不存在，返回步骤2');
            // 添加用户消息
            AppCore.UIUtil.addMessage('user', userInput);
            
            // 保存用户详情，以便后续使用
            AppCore.AppState.userDetails = userInput;
            localStorage.setItem('userDetails', userInput);
            
            // 清空输入框
            AppCore.UI.chatInput.value = '';
            
            // 提示用户先选择解忧方案
            setTimeout(() => {
                AppCore.UIUtil.addMessage('system', '请先选择一种解忧方案');
                ChatSteps.proceedToStep2(); // 返回到选择解忧方案步骤
            }, 500);
            
            return;
        }
        
        console.log('进行正常的追问处理，当前追问次数:', ConversationManager.getCurrentIndex());
        
        // 保存用户输入
        ConversationManager.addQuery(userInput);
        
        // 添加用户消息
        AppCore.UIUtil.addMessage('user', userInput);
        
        // 清空输入框
        AppCore.UI.chatInput.value = '';
        
        // 先移除所有事件监听器
        this.removeAllEventListeners();
        
        // 显示正在解读提示
        setTimeout(() => {
            AppCore.UIUtil.showTypingIndicator();
            
            // 模拟API调用
            setTimeout(async () => {
                AppCore.UIUtil.removeTypingIndicator();
                
                console.log('调用API获取追问回答');
                // 实际项目中替换为真实API调用
                const result = await ApiService.callDeepSeekApi(ApiService.buildFollowUpPrompt());
                
                // 保存结果
                ConversationManager.addResult(result);
                
                // 增加索引
                ConversationManager.incrementIndex();
                console.log(`用户追问后，当前追问次数增加为: ${ConversationManager.getCurrentIndex()}`);
                
                // 显示结果
                AppCore.UIUtil.addMessage('system', result);
                
                // 再次显示功能胶囊
                self.showStepFourCapsules();
                
                // 重新绑定事件监听器，确保继续使用当前处理函数
                self.setupStepFourInput();
            }, 2000);
        }, 500);
    },

    // Step 5: 解忧小Tips
    proceedToStep5() {
        console.log('Proceeding to Numbers Project Step 5');
        AppCore.AppState.chatStep = 5;
        
        // 保存对象引用
        const self = this;
        
        // 显示正在处理的消息
        setTimeout(() => {
            AppCore.UIUtil.showTypingIndicator();
            
            setTimeout(() => {
                AppCore.UIUtil.removeTypingIndicator();
                AppCore.UIUtil.addMessage('system', '正在为您准备解忧小Tips，请稍等片刻...');
                
                // 调用API获取解忧Tips
                setTimeout(async () => {
                    console.log('调用API获取解忧Tips');
                    
                    // 实际项目中替换为真实API调用
                    const result = await ApiService.callDeepSeekApi(ApiService.buildTipsPrompt());
                    
                    // 保存结果到对话历史
                    ConversationManager.addTipsResult(result);
                    
                    // 显示结果
                    AppCore.UIUtil.addMessage('system', result);
                    
                    // 设置事件监听器处理追问
                    self.setupTipsInput();
                    
                    console.log('解忧Tips初始API调用完成，已设置事件监听器');
                }, 2000);
            }, 1500);
        }, 500);
    },
    
    // 设置Tips输入框事件监听
    setupTipsInput() {
        console.log('设置Step 5 Tips输入框事件监听，当前步骤:', AppCore.AppState.chatStep);
        
        // 确保当前步骤是5
        if (AppCore.AppState.chatStep !== 5) {
            console.log('当前不是步骤5，不设置Tips事件监听器');
            return;
        }
        
        // 保存this引用
        const self = this;
        
        // 先移除所有现有事件监听器
        this.removeAllEventListeners();
        
        // 定义Enter键处理函数
        const keyPressHandler = function(e) {
            if (e.key === 'Enter') {
                self.handleTipsInput.call(self);
            }
        };
        
        // 先检查是否已达到最大Tips追问次数
        if (ConversationManager.hasReachedMaxTipsQueries()) {
            console.log('已达到最大Tips追问次数，绑定特殊处理函数');
            // 绑定特殊处理函数
            if (AppCore.UI.sendButton) {
                AppCore.UI.sendButton.addEventListener('click', function() {
                    if (AppCore.UI.chatInput.value.trim()) {
                        AppCore.UIUtil.addMessage('user', AppCore.UI.chatInput.value.trim());
                        AppCore.UI.chatInput.value = '';
                        setTimeout(() => {
                            AppCore.UIUtil.addMessage('system', '感谢您的使用，祝您天天好心情');
                        }, 500);
                    }
                });
            }
            
            if (AppCore.UI.chatInput) {
                AppCore.UI.chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' && AppCore.UI.chatInput.value.trim()) {
                        AppCore.UIUtil.addMessage('user', AppCore.UI.chatInput.value.trim());
                        AppCore.UI.chatInput.value = '';
                        setTimeout(() => {
                            AppCore.UIUtil.addMessage('system', '感谢您的使用，祝您天天好心情');
                        }, 500);
                    }
                });
            }
        } else {
            // 正常Tips追问处理函数
            const handleClick = function() {
                self.handleTipsInput.call(self);
            };
            
            // 绑定处理函数
            if (AppCore.UI.sendButton) {
                console.log('绑定正常Tips追问处理函数');
                AppCore.UI.sendButton.addEventListener('click', handleClick);
            }
            
            if (AppCore.UI.chatInput) {
                AppCore.UI.chatInput.addEventListener('keypress', keyPressHandler);
            }
        }
        
        console.log('Step 5 Tips事件监听器设置完成，当前Tips追问次数:', ConversationManager.getCurrentTipsIndex());
    },
    
    // 处理Tips追问输入
    handleTipsInput() {
        console.log('执行handleTipsInput，处理用户Tips追问，当前步骤:', AppCore.AppState.chatStep);
        
        // 确保当前步骤是5
        if (AppCore.AppState.chatStep !== 5) {
            console.log('当前不是步骤5，不处理Tips用户输入');
            return;
        }
        
        const userInput = AppCore.UI.chatInput.value.trim();
        if (!userInput) return;
        
        // 保存对象引用
        const self = this;
        
        // 检查是否达到最大Tips追问次数
        if (ConversationManager.hasReachedMaxTipsQueries()) {
            console.log('已达到最大Tips追问次数');
            // 添加用户消息
            AppCore.UIUtil.addMessage('user', userInput);
            
            // 清空输入框
            AppCore.UI.chatInput.value = '';
            
            // 先移除所有事件监听器
            this.removeAllEventListeners();
            
            // 提示用户已经达到最大Tips追问次数
            setTimeout(() => {
                AppCore.UIUtil.addMessage('system', '感谢您的使用，祝您天天好心情');
                
                // 重新绑定事件监听器确保正确处理
                self.setupTipsInput();
            }, 500);
            
            return;
        }
        
        console.log('进行正常的Tips追问处理，当前Tips追问次数:', ConversationManager.getCurrentTipsIndex());
        
        // 保存用户输入
        ConversationManager.addTipsQuery(userInput);
        
        // 添加用户消息
        AppCore.UIUtil.addMessage('user', userInput);
        
        // 清空输入框
        AppCore.UI.chatInput.value = '';
        
        // 先移除所有事件监听器
        this.removeAllEventListeners();
        
        // 显示正在解读提示
        setTimeout(() => {
            AppCore.UIUtil.showTypingIndicator();
            
            // 模拟API调用
            setTimeout(async () => {
                AppCore.UIUtil.removeTypingIndicator();
                
                console.log('调用API获取Tips追问回答');
                // 实际项目中替换为真实API调用
                const result = await ApiService.callDeepSeekApi(ApiService.buildTipsFollowUpPrompt());
                
                // 保存结果
                ConversationManager.addTipsResult(result);
                
                // 增加索引
                ConversationManager.incrementTipsIndex();
                console.log(`用户Tips追问后，当前追问次数增加为: ${ConversationManager.getCurrentTipsIndex()}`);
                
                // 显示结果
                AppCore.UIUtil.addMessage('system', result);
                
                // 重新绑定事件监听器，确保继续使用当前处理函数
                self.setupTipsInput();
            }, 2000);
        }, 500);
    },

    // 重置状态
    reset() {
        console.log('Resetting Numbers Project state');
        
        // 重置状态，移除事件监听器
        if (AppCore && AppCore.UI) {
            if (AppCore.UI.sendButton) {
                AppCore.UI.sendButton.removeEventListener('click', this.handleStepFourInput);
                AppCore.UI.sendButton.removeEventListener('click', this.handleTipsInput);
            }
            
            if (AppCore.UI.chatInput) {
                const self = this;
                
                // 移除Step 4事件监听器
                AppCore.UI.chatInput.removeEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        self.handleStepFourInput();
                    }
                });
                
                // 移除Step 5事件监听器
                AppCore.UI.chatInput.removeEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        self.handleTipsInput();
                    }
                });
            }
        }
        
        // 确保ConversationManager被重置
        if (window.ConversationManager) {
            ConversationManager.resetHistory();
        }
    },

    // 移除所有事件监听器的通用方法
    removeAllEventListeners() {
        console.log('移除所有事件监听器');
        
        if (AppCore.UI.sendButton) {
            AppCore.UI.sendButton.removeEventListener('click', ChatManager.sendMessage);
            AppCore.UI.sendButton.removeEventListener('click', ChatSteps.showSchemeSelectionReminder);
            AppCore.UI.sendButton.removeEventListener('click', this.handleStepFourInput);
            AppCore.UI.sendButton.removeEventListener('click', this.handleTipsInput);
            
            // 尝试移除可能的匿名函数监听器
            const newButton = AppCore.UI.sendButton.cloneNode(true);
            if (AppCore.UI.sendButton.parentNode) {
                AppCore.UI.sendButton.parentNode.replaceChild(newButton, AppCore.UI.sendButton);
                AppCore.UI.sendButton = newButton;
            }
        }
        
        if (AppCore.UI.chatInput) {
            AppCore.UI.chatInput.removeEventListener('keypress', AppCore.Helpers.handleKeyPress);
            AppCore.UI.chatInput.removeEventListener('keypress', AppCore.AppState.handleNumbersInputKeyPress);
            
            // 尝试移除可能的匿名函数监听器
            const newInput = AppCore.UI.chatInput.cloneNode(true);
            if (AppCore.UI.chatInput.parentNode) {
                AppCore.UI.chatInput.parentNode.replaceChild(newInput, AppCore.UI.chatInput);
                AppCore.UI.chatInput = newInput;
            }
        }
    }
};

// 导出模块
window.NumbersProject = NumbersProject; 