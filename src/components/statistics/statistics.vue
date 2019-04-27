<template>
    <div id="component-statistics">
        <header>
            <div class="icon"></div>
        </header>
    </div>
</template>

<script>
    export default {
        porps: [

        ]
    }
</script>

<style lang="scss" scoped>
@import '../../css/color';
@import '../../css/frame';

#component-statistics {
    @include frame($main3, '../../image/chart-fill.png');
    color: $line1;
}
</style>
