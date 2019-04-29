<template>
    <div class="pomo-settings">
        <div @click="closeSettings" class="darker-cover"></div>
        <div class="setting-box"
            :class="{ 'card-show' : isSettingsOpen }">
            <div class="setting-title">番茄设置</div>
            <div class="setting-initFocus">
                <p class="setting-heading">专注时长：{{ initFocus }} 分钟</p>
                <input type="range" min="1" max='120' :value="initFocus" @change="change('focus')">
            </div>
            <div class="setting-initRest">
                <p class="setting-heading">休息时长：{{ initRest }} 分钟</p>
                <input type="range" min="1" max='30' :value="initRest" @change="change('rest')">
            </div>
            <div>（左右键可微调）</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'initFocus',
            'initRest',
            'isSettingsOpen'
        ],
        methods: {
            change: function(type) {
                let value = Number(event.target.value);
                this.$emit('change', {type: type, value: value});
            },
            closeSettings: function() {
                this.$emit('toggle-settings');
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../css/pomo-settings.scss';
</style>
