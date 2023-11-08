import {ref} from "@vue/reactivity";

export let money = ref<number>(0);
export let betMoney = ref<number>(1);

export let hasEnoughMoney = computed(args => {
  return money.value >= betMoney.value;
})

export function changeMoney(change: number) {
  money.value += change;

  const route = useRoute();
  let config = useRuntimeConfig();
  console.log(config.public.apiUrl);

  fetch(`${config.public.apiUrl}/user/points/change/?userID=${route.query.userID}&points=${change}`).then(value => {
    fetchMoney().then();
  });
}

export async function fetchMoney() {
  const route = useRoute();
  let config = useRuntimeConfig();
  console.log(config.public.apiUrl);

  let response = await fetch(config.public.apiUrl + "/user/points/" + route.query.userID)

  if (response.status != 200) {
    alert("user not found!")
    return
  }

  money.value = await response.json()
}