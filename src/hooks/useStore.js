import { create } from 'zustand'
import { IMAGE_STATUS } from "../constants/imageStatus";

export const useStore = create((set) => ({
    imageStatus: IMAGE_STATUS.READY,
    imageOriginal: '',
    imageWithouBackground: '',
    imageWithBlur: '',
    imageUploading: () => {
        set(() => ({
            imageStatus: IMAGE_STATUS.UPLOADING
        }))
    },
    imageError: () => {
        set(() => ({
            imageStatus: IMAGE_STATUS.ERROR
        }))
    },
    imageDone: () => {
        set(() => ({
            imageStatus: IMAGE_STATUS.DONE
        }))
    },
    imageReady: () => {
        set(() => ({
            imageStatus: IMAGE_STATUS.READY
        }))
    },
    updatedOriginalImage: (url) => {
        set(() => ({
            imageOriginal: url
        }))
    },
    updatedImageWithouBackground: (url) => {
        set(() => ({
            imageWithouBackground: url
        }))
    },
    updatedBlurImage: (url) => {
        set(() => ({
            imageWithBlur: url
        }))
    }
}))