<template>
<div id="tutorial" class="bg-white p-2 hidden rounded z-30 tooltip" style="width: 200px; padding-top: 2px">
    <h1 style="padding-top: 0">
      Tutorial
      <div v-touch="close" class="cursor-pointer" style="position: absolute; top: -2px; right: 5px">
        <i class="fas fa-times" style="font-size: 1.5rem; font-weight: normal"></i>
      </div>
    </h1>
    
    
    {{ $t(text) }}
    <div class="flex justify-around items-center mt-2">
      <div>{{ currentCount }}/{{ maxCount }}</div>
      <button @click="next" class="text-white rounded p-1 px-3" style="background-color: rgb(0 125 224)">
        <span v-if="currentCount < maxCount">{{ $t('tutorial.next') }}</span>
        <span v-else>{{ $t('tutorial.close') }}</span>
        
      </button>
    </div>
    <div class="arrow" data-popper-arrow></div>
</div>
</template>

<style>
.tooltip[data-popper-placement^='left'] > .arrow {
    left: 196px;
}
</style>

<script>
import { onMounted, ref } from 'vue';
import { createPopper } from '@popperjs/core';
import { getMap } from '../services/map';
import store from '../services/store';

export default {
  name: 'Tutorial',
  setup() {
    const targets = [
      null,
      () => document.getElementById('add'),
      () => document.getElementsByClassName('leaflet-control-zoom')[0],
      () => document.getElementById('info-box'),
      () => document.getElementById('user-marker') || document.getElementById('info-box')
    ];
    
    const positions = [
      null,
      'left',
      'left',
      'bottom',
      'left'
    ];
    
    const offsets = [
      null,
      [-10, 10],
      [-10, 10],
      [0, 0],
      [0, 0]
    ];
    
    const text = ref('');
    const currentCount = ref(0);
    const maxCount = ref(4);
    
    let popper;
    
    onMounted(() => {
      next();
    });
    
    function next() {
      const tooltip = document.getElementById('tutorial');
      currentCount.value++;
      if(currentCount.value > maxCount.value) {
        tooltip.classList.add('hidden');
        store.commit('setTutorialShown');
        return;
      }
      text.value = `tutorial.text${currentCount.value}`;
      
      popper = createPopper(
          targets[currentCount.value](), 
          tooltip, 
          {
              placement: positions[currentCount.value],
              modifiers: [
                  {
                      name: 'offset',
                      options: {
                          offset: offsets[currentCount.value]
                      }
                  }
              ]
          }
      );
      
      tooltip.classList.remove('hidden');
      popper.update();
      if(currentCount.value === 4) {
        getMap().addEventListener('move', () => {
            popper.update();
        });
      }
    }
    
    function close() {
      currentCount.value = maxCount.value + 1;
      next();
    }
    
    return {
      text,
      currentCount,
      maxCount,
      next,
      close
    };
  }
}
</script>