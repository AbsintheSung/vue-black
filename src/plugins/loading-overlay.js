import { ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
const loading = useLoading()
const nowLoading = ref('')

export function showLoading() {
    nowLoading.value = loading.show();
}

export function hideLoading() {
    nowLoading.value.hide()
}