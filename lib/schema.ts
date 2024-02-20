import { z } from "zod"

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const PropertiesFormSchema = z.object({
    fillcolor: z.string(),
    strokecolor: z.string(),
    image: z
        .any()
        .refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    grayscale: z.string({
        required_error: "Please select an position to display.",
    }),
    brightness: z.array(z.number().min(0).max(1)),
})