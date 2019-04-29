<template>
    <div class="pomo-bgm">
        <input type="checkbox" class="pomo-btn" :class="{'bgm-enabled': bgmEnabled}"
            :checked="bgmEnabled"
            @change="bgmToggle"
        >
        <audio preload id="bgm-piano">
            <source :src="bgm" type="audio/mp3">
        </audio>
    </div>
</template>

<script>
    import bgm from './quietmorning.mp3';
    export default {
        data: function() {
            return {
                'bgmEnabled': false,
                'bgm': bgm,
            }
        },
        methods: {
            bgmToggle: function() {
                let checked = event.target.checked;
                let audio = document.getElementById('bgm-piano');
                this.bgmEnabled = checked ? true : false;
                if (this.bgmEnabled) {
                    audio.currentTime = 0;
                    audio.play();
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            },
        },
    }
</script>

<style scoped>
</style>
