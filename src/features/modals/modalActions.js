export const modalConstants = {
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_CLOSE'
};

export const openModal = (modalType, modalProps) => {
  return {
    type: modalConstants.MODAL_OPEN,
    payload: { modalType, modalProps }
  };
};

export const closeModal = () => {
  return {
    type: modalConstants.MODAL_CLOSE
  };
};
