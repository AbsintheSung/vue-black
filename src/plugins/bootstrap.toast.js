import { ref, onMounted } from 'vue'
import Toast from 'bootstrap/js/dist/toast'
export function useToast() {
    const toastDom = ref(null)
    const toast = ref(null)
    onMounted(() => {
        toast.value = new Toast(toastDom.value)
    })
    const handleHide = () => {
        toast.value.hide()
    }
    const handleShow = () => {
        toast.value.show()
        // console.log(toast.value.isShown())
    }

    return {
        toastDom, toast, handleHide, handleShow
    }
}