/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Button,
  FileInput,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppState,
  ImageState,
  PropertyState,
  ReducerTypes,
  Roles,
  userData,
  UserState,
} from "../../types";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  submitFeedbackReducer,
  uploadImageFile,
} from "../../store/features/reducers";
import { clear } from "../../store/features/imageSlice";
import { toast } from "react-toastify";
import { clearSubmittion } from "../../store/features/propertySlice";

interface Feedback {
  id: number;
  feedback: FeedbackData;
}
interface FeedbackData {
  feedback: string;
  comment: string;
  imageIds?: any[];
}

export const DefectFeedbackModal = function (props: any) {
  const { isOpen, setOpen, title, defectId, feedback } = props;
  const { imageData, isIdle }: ImageState = useSelector(
    (state: any) => state.uploads
  );
  const { feedbackResponse }: PropertyState = useSelector(
    (state: any) => state.property
  );
  const [imgs, setImgs] = useState<any>([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
      dispatch(uploadImageFile(event.target.files[0]));
    }
  };

  useEffect(() => {
    if (imageData && imageData.id > 0) {
      setImgs([...imgs, imageData]);
      dispatch(clear());
    }
  }, [imageData]);

  const submitFeedbackHandler = () => {
    if (comment.trim().length == 0) {
      toast.warning("Please input comment!");
    } else {
      const params: Feedback = {
        id: defectId,
        feedback: {
          feedback,
          comment: comment,
        },
      };
      if (imgs.length > 0) {
        params.feedback.imageIds = imgs.map((i) => i.id);
      }
      dispatch(submitFeedbackReducer(params));
      dispatch(clear());
      setImgs([]);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (feedbackResponse) {
      if (feedbackResponse && feedbackResponse.error) {
        toast.error(feedbackResponse.error);
      } else {
        if (feedback == "accept") {
          toast.info("Defect submission accepted!");
        } else {
          toast.info("Defect submission rejected!");
        }
      }

      dispatch(clearSubmittion());
    }
  }, [feedbackResponse]);
  console.log(feedbackResponse);
  return (
    <>
      <Modal
        onClose={() => {
          dispatch(clear());
          setImgs([]);
          setOpen(false);
        }}
        show={isOpen}
        size="2xl"
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-5">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
              </div>
              <Textarea
                className="w-full"
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {feedback !== "accept" && (
              <div className="flex h-[200px] flex-row gap-2 overflow-x-scroll">
                {imgs &&
                  imgs.length > 0 &&
                  imgs.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="flex h-[180px] min-w-[180px] max-w-[180px] items-center justify-center"
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="h-[180px] min-w-[180px] max-w-[180px] object-scale-down"
                        />
                      </div>
                    );
                  })}
                <div className="flex items-center justify-center">
                  <Label
                    htmlFor="dropzone-file"
                    className="relative flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center p-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop images
                      </p>
                    </div>
                    <FileInput
                      id="dropzone-file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={!isIdle}
                    />
                    {!isIdle && (
                      <div
                        role="status"
                        className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
                      >
                        <svg
                          aria-hidden="true"
                          className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              submitFeedbackHandler();
            }}
          >
            Submit
          </Button>
          <Button
            color="gray"
            onClick={() => {
              dispatch(clear());
              setImgs([]);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
