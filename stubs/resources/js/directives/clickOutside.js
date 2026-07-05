const clickOutside = {
    mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        };
        setTimeout(() => {
            document.addEventListener('click', el.clickOutsideEvent);
        },100)
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};

export default clickOutside
