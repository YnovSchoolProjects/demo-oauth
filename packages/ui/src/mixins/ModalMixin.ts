import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ModalMixin extends Vue {
  private isOpen: boolean = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
