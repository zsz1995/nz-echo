// 播放模式配置文件
const options = {
    default: {
        label: '默认',
        value: 'default',
        icon: 'my-icon-more'
    },
    random: {
        label: '随机播放',
        value: 'random',
        icon: 'my-icon-random'
    },
    singleRepeat: {
        label: '单曲循环',
        value: 'singleRepeat',
        icon: 'my-icon-repeatone'
    },
    listRepeat: {
        label: '列表循环',
        value: 'listRepeat',
        icon: 'my-icon-repeat'
    }
};

// 查找当前value的item
export function findActiveMode(value) {
    return ArrayOptions.find(item => item.value === value)

}

export let ArrayOptions = [];
Object.keys(options).forEach(key => {
    ArrayOptions.push(options[key])
});

export default options;