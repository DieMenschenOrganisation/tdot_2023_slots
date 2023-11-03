import {ref} from "@vue/reactivity";

export let money = ref<number>(1000);
export let betMoney = ref<number>(1);

export let hasEnoughMoney = computed(args => {
  return money.value >= betMoney.value;
})

export function changeMoney(change: number) {
  money.value += change;
}