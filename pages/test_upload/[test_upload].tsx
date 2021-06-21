import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import KrUser from '../../models/krUser';
import { useRouter } from 'next/router';

export default function TestUpload({ res }: any) {
    const url = JSON.parse(res);
    const router = useRouter();

    const updateUserList: Function = () => {
        router.replace(router.asPath);
    };

    const onChange = async (formData: FormData) => {
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event: any) => {
                console.log(
                    `Current progress:`,
                    Math.round((event.loaded * 100) / event.total)
                );
            },
        };

        const response = await axios.post('../api/upload', formData, config);
        updateUserList();

        console.log('response', response.data);
    };

    return (
        <>
            <h1>Test upload page</h1>
            <UiFileInputButton
                label="Upload Single File"
                uploadFileName="theFile"
                onChange={onChange}
                url={url}
            />
            {/* <UiFileInputButton
                label="Upload Multiple Files"
                uploadFileName="theFiles"
                onChange={onChange}
                allowMultipleFiles={true}
            /> */}
        </>
    );
}

export interface IProps {
    acceptedFileTypes?: string;
    allowMultipleFiles?: boolean;
    label: string;
    onChange: (formData: FormData) => void;
    uploadFileName: string;
    url: string;
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const formRef = React.useRef<HTMLFormElement | null>(null);

    const onClickHandler = () => {
        fileInputRef.current?.click();
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }

        const formData = new FormData();

        Array.from(event.target.files).forEach((file) => {
            formData.append(event.target.name, file);
        });

        props.onChange(formData);

        formRef.current?.reset();
    };

    return (
        <>
            <form ref={formRef}>
                <button type="button" onClick={onClickHandler}>
                    {props.label}
                </button>
                <input
                    accept={props.acceptedFileTypes}
                    multiple={props.allowMultipleFiles}
                    name={props.uploadFileName}
                    onChange={onChangeHandler}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    type="file"
                />
            </form>
            <img src={props.url} alt="me" width="164" height="164" />
        </>
    );
};

UiFileInputButton.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: false,
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const [data] = await KrUser.find({ _id: ctx.query.test_upload });

        if (!data) {
            return {
                notFound: true,
            };
        }
        const res = JSON.stringify(data.image);

        return {
            props: { res }, // will be passed to the page component as props
        };
    } catch (e) {
        console.error(e);
    }
};
