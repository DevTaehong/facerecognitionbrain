import React, {useState} from 'react';
import './ImageLinkForm.css';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useMediaQuery } from 'react-responsive';

const ImageLinkForm = ({ onPictureSubmit, ageRange, isLoading, onInputChange, ageResult, input }) => {
    const [imageFileUrl, setImageFileUrl] = useState("");
	const [uploadingImg, setUploadingImg] = useState(false);
	const [fileRemoved, setFileRemoved] = useState(false);

	// It is in the ImgUploader function
    const getImageFileObject = (imageFile) => {
		if (imageFile.file) {
			setUploadingImg(false);
			// Source: https://medium.com/geekculture/how-to-upload-images-to-cloudinary-with-a-react-app-f0dcc357999c
			const data = new FormData();
			data.append("file", imageFile.file);
			data.append("upload_preset", "MyReactApp");
			data.append("cloud_name", "dlbf93yzm");
			fetch("https://api.cloudinary.com/v1_1/dlbf93yzm/image/upload", {
				method: "POST",
				body: data
			})
			.then(res => res.json())
			.then(data => {
				setImageFileUrl(data.url);
				setUploadingImg(false);
			})
			.catch(err => {console.log(err)})
		}
	}

	// When a user clicks the delete Icon
	const runAfterImageDelete = (file) => {
		setFileRemoved(true);
		console.log({ file })
	}

	const isMobile = useMediaQuery({ query: '(max-width: 425px)' })

	const BottomRadius = "1rem";
	const deleteIconBeforeUpload = <img src='' alt='' />;
	const deleteIconAfterUpload = <img src='https://img.icons8.com/material-outlined/24/FFFFFF/delete-sign.png'alt='' />
	const mobileWidthHeight = 300;
	const notMobileWidthHeight = 400;

	const ImgUploader = (BottomRadius, deleteIcon, widthHeight) => (
		<ImageUploader 
			style={{
				height: widthHeight,
				width: widthHeight,
				borderTopLeftRadius: "1rem", 
				borderTopRightRadius: "1rem",
				borderBottomLeftRadius: BottomRadius,
				borderBottomRightRadius: BottomRadius
			}}
			deleteIcon={deleteIcon}
			uploadIcon={
				<div>
					<svg
						className='svg-circleplus'
						viewBox='0 0 100 100'
						style={{ height: '40px', stroke: '#000' }}
					>
						<circle cx='50' cy='50' r='45' fill='none' strokeWidth='7.5'></circle>
						<line x1='32.5' y1='50' x2='67.5' y2='50' strokeWidth='5'></line>
						<line x1='50' y1='32.5' x2='50' y2='67.5' strokeWidth='5'></line>
					</svg>
					<p>Select a picture</p>
				</div>
			}
			onFileAdded={(img) => getImageFileObject(img)}
			onFileRemoved={(img) => runAfterImageDelete(img)}
		/>
	)

	return (
		<div>
			<div className='center pv1'>
				<div className="db center tc black link br4 shadow-5 br-bottom4">
					{!imageFileUrl ?	
						// ImageUploader UI before uploading a pic
						ImgUploader(BottomRadius, deleteIconBeforeUpload, mobileWidthHeight)
						:   
						// ImageUploader UI after uploading a pic
						isMobile ?   
							ImgUploader(0, deleteIconAfterUpload, mobileWidthHeight)
							: 
							ImgUploader(0, deleteIconAfterUpload, notMobileWidthHeight)
					}
					{!fileRemoved &&(
						ageRange &&
							(isMobile ?
								<div className='center black f5 b pt1'>
										{ageRange === "more than 70" 
										? `Your face age is more than 70`
										:`Your age is between: ${ageRange}`}
										<br />
										{`Age entered: ${input}`}
										<br />
										{`${ageResult}`}
								</div>
								:
								<div className='center black f4 b pt1'>
										{ageRange === "more than 70" 
										? `Your face age is more than 70`
										: `Your age is between: ${ageRange}`}
										<br />
										{`Age entered: ${input}`}
										<br />
										{`${ageResult}`}
								</div>
							)
						)
					}
					{uploadingImg && <LoadingSpinner />}
					{isLoading 
						? 
							<LoadingSpinner />
						:	
							imageFileUrl &&
								<div>
									<input 
										className='f4 p12 mr1 db center ba b--black mt1' 
										type='text' 
										onChange={onInputChange} 
										placeholder='Please enter your age...'
									/>
									<button 
										className='button-26 b mt1 mb2' 
										onClick={event => onPictureSubmit(imageFileUrl, setFileRemoved(false))}
									>
										Test how old am I
									</button>
								</div>
					}
				</div>
			</div>
		</div>
	)
	}

export default ImageLinkForm;