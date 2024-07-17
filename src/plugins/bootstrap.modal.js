import { ref, onMounted } from 'vue'
import Modal from 'bootstrap/js/dist/modal';
export function useModal() {
    const modalOption = ref(null)
    const modal = ref(null)

    onMounted(() => {
        modal.value = new Modal(modalOption.value, {
            focus: false
        })
    })

    const myModalShow = () => {
        modal.value.show()
    }

    const myModalClose = () => {
        modal.value.hide()
    }

    return {
        myModalShow, myModalClose, modal, modalOption
    }
}