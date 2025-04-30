// complete-project.js - 结合整体运势解忧方案模块

// 结合整体运势解忧方案管理
const CompleteProject = {
    // Step 3: 初始化整体运势解忧流程
    proceedToCompleteStep3() {
        console.log('Proceeding to Complete Project Step 3');
        AppCore.AppState.chatStep = 3;
        
        // 显示系统消息
        setTimeout(() => {
            AppCore.UIUtil.showTypingIndicator();
            
            setTimeout(() => {
                AppCore.UIUtil.removeTypingIndicator();
                
                // 这里是结合整体运势解忧的Step 3实现
                AppCore.UIUtil.addMessage('system', '我们现在将结合您的整体运势进行解忧...');
                
                // TODO: 实现CompleteProject的Step 3
                // 示例实现
                this.showCompleteStep3Options();
            }, 1500);
        }, 500);
    },

    // 显示整体运势解忧Step3的选项
    showCompleteStep3Options() {
        const capsulesDiv = document.createElement('div');
        capsulesDiv.className = 'function-capsules';
        
        // 选项A
        const optionACapsule = document.createElement('div');
        optionACapsule.className = 'function-capsule';
        const optionAButton = document.createElement('button');
        optionAButton.textContent = '选项A（占位）';
        optionAButton.addEventListener('click', () => {
            // 处理选项A
            AppCore.UIUtil.addMessage('user', '选择了选项A');
            this.proceedToCompleteStep4();
        });
        optionACapsule.appendChild(optionAButton);
        
        // 选项B
        const optionBCapsule = document.createElement('div');
        optionBCapsule.className = 'function-capsule';
        const optionBButton = document.createElement('button');
        optionBButton.textContent = '选项B（占位）';
        optionBButton.addEventListener('click', () => {
            // 处理选项B
            AppCore.UIUtil.addMessage('user', '选择了选项B');
            this.proceedToCompleteStep4();
        });
        optionBCapsule.appendChild(optionBButton);
        
        capsulesDiv.appendChild(optionACapsule);
        capsulesDiv.appendChild(optionBCapsule);
        AppCore.UI.chatMessages.appendChild(capsulesDiv);
        
        // 自动滚动到底部
        AppCore.UI.chatMessages.scrollTop = AppCore.UI.chatMessages.scrollHeight;
    },

    // Step 4: 整体运势解忧的第二阶段
    proceedToCompleteStep4() {
        console.log('Proceeding to Complete Project Step 4');
        AppCore.AppState.chatStep = 4;
        
        // 显示系统消息
        setTimeout(() => {
            AppCore.UIUtil.showTypingIndicator();
            
            setTimeout(() => {
                AppCore.UIUtil.removeTypingIndicator();
                
                // 这里是结合整体运势解忧的Step 4实现
                AppCore.UIUtil.addMessage('system', '现在进入整体运势解忧的第二阶段...');
                
                // TODO: 实现CompleteProject的Step 4
                // 示例实现
                this.showCompleteStep4Options();
            }, 1500);
        }, 500);
    },

    // 显示整体运势解忧Step4的选项
    showCompleteStep4Options() {
        const capsulesDiv = document.createElement('div');
        capsulesDiv.className = 'function-capsules';
        
        // 继续选项
        const continueOptionCapsule = document.createElement('div');
        continueOptionCapsule.className = 'function-capsule';
        const continueOptionButton = document.createElement('button');
        continueOptionButton.textContent = '继续（占位）';
        continueOptionButton.addEventListener('click', () => {
            // 处理继续选项
            AppCore.UIUtil.addMessage('user', '选择继续');
            this.proceedToCompleteStep5();
        });
        continueOptionCapsule.appendChild(continueOptionButton);
        
        // 返回解忧方案选择
        const backOptionCapsule = document.createElement('div');
        backOptionCapsule.className = 'function-capsule';
        const backOptionButton = document.createElement('button');
        backOptionButton.textContent = '返回解忧方案选择';
        backOptionButton.addEventListener('click', () => {
            // 处理返回选项
            AppCore.UIUtil.addMessage('user', '返回解忧方案选择');
            ChatSteps.proceedToStep2();
        });
        backOptionCapsule.appendChild(backOptionButton);
        
        capsulesDiv.appendChild(continueOptionCapsule);
        capsulesDiv.appendChild(backOptionCapsule);
        AppCore.UI.chatMessages.appendChild(capsulesDiv);
        
        // 自动滚动到底部
        AppCore.UI.chatMessages.scrollTop = AppCore.UI.chatMessages.scrollHeight;
    },

    // Step 5: 整体运势解忧的最终阶段
    proceedToCompleteStep5() {
        console.log('Proceeding to Complete Project Step 5');
        AppCore.AppState.chatStep = 5;
        
        // 显示系统消息
        setTimeout(() => {
            AppCore.UIUtil.showTypingIndicator();
            
            setTimeout(() => {
                AppCore.UIUtil.removeTypingIndicator();
                
                // 这里是结合整体运势解忧的Step 5实现
                AppCore.UIUtil.addMessage('system', '完成整体运势解忧，这是最终阶段...');
                
                // TODO: 实现CompleteProject的Step 5
                // 示例实现
                setTimeout(() => {
                    AppCore.UIUtil.addMessage('system', '解忧结束，希望能帮到您！');
                    
                    // 显示重新开始的选项
                    this.showRestartOption();
                }, 1500);
            }, 1500);
        }, 500);
    },

    // 显示重新开始的选项
    showRestartOption() {
        const capsulesDiv = document.createElement('div');
        capsulesDiv.className = 'function-capsules';
        
        // 重新开始
        const restartCapsule = document.createElement('div');
        restartCapsule.className = 'function-capsule';
        const restartButton = document.createElement('button');
        restartButton.textContent = '重新开始';
        restartButton.addEventListener('click', () => {
            // 返回首页
            AppCore.UIUtil.addMessage('user', '重新开始');
            document.getElementById('chat-page').classList.remove('active');
            document.getElementById('home-page').classList.add('active');
        });
        restartCapsule.appendChild(restartButton);
        
        capsulesDiv.appendChild(restartCapsule);
        AppCore.UI.chatMessages.appendChild(capsulesDiv);
        
        // 自动滚动到底部
        AppCore.UI.chatMessages.scrollTop = AppCore.UI.chatMessages.scrollHeight;
    },
    
    // 重置状态
    reset() {
        console.log('Resetting Complete Project state');
        // 重置状态，移除事件监听器
        // 目前无特定事件监听器需要移除
    }
};

// 导出模块
window.CompleteProject = CompleteProject; 