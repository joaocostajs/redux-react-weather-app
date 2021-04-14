import { store } from 'react-notifications-component';

export const notification = (title, message,type ) => {
    console.log(title, message, type)
    return {
        title: title.toString(),
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      }
}