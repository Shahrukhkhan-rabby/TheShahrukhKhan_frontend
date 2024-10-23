'use client';

import React, { useState } from 'react';
import { Input, Textarea } from '@nextui-org/input';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { Chip } from '@nextui-org/chip';
import { useEditAbout } from '@/hooks/about.hook';
import { useEditAdmin } from '@/hooks/auth.hook';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { TAbout } from '@/types';
import { FaImage } from 'react-icons/fa';
import { Spinner } from '@nextui-org/spinner';

interface TProfileProps {
  about: TAbout[]; // Ensure TAbout[] is typed correctly
}

export default function About({ about }: TProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false); // For image upload loading
  const { mutate: editAboutFn, isPending: aboutIsPending } = useEditAbout();
  const { mutate: editAdminFn, isPending: adminIsPending } = useEditAdmin();

  const profileData = {
    ...about[0].me,
    title: about[0].title,
    description: about[0].description,
    country: about[0].country,
    address: about[0].address,
    district: about[0].district,
  };

  const adminData = {
    name: about[0].me.name,
    image: about[0].me.image,
  };

  const [editableData, setEditableData] = useState(profileData);
  const [editableAdminData, setEditableAdminData] = useState(adminData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageUploading(true);
      const uploadedUrl = await uploadImageToCloudinary(file);
      setEditableAdminData((prevData) => ({ ...prevData, image: uploadedUrl }));
      setIsImageUploading(false);
    }
  };

  const handleSaveClick = async () => {
    try {
      const editAboutData = {
        id: about[0]._id,
        data: {
          title: editableData.title,
          description: editableData.description,
          country: editableData.country,
          address: editableData.address,
          district: editableData.district,
        },
      };

      const editAdminData = {
        name: editableAdminData.name,
        image: editableAdminData.image,
      };

      editAboutFn(editAboutData);
      editAdminFn(editAdminData);

      console.log('Data successfully saved:', {
        about: editableData,
        admin: editableAdminData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card>
        <CardBody>
          <div className="flex items-center mb-4">
            {isEditing ? (
              <>
                {' '}
                <label className="cursor-pointer my-4 flex items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    variant="bordered"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  {isImageUploading ? (
                    <div className="w-24 h-24 rounded-full border border-default-200 flex items-center justify-center">
                      <Spinner color="warning" />
                    </div>
                  ) : (
                    <Image
                      src={editableAdminData.image}
                      width={50}
                      height={50}
                      alt="Uploaded Image"
                      className="rounded-full size-24 object-cover"
                    />
                  )}
                </label>
              </>
            ) : (
              <>
                <Image
                  width={500}
                  height={500}
                  src={editableAdminData.image}
                  alt={editableAdminData.name}
                  className="w-24 h-24 rounded-full border-2 object-cover border-default-300"
                />
              </>
            )}

            <div className="ml-4">
              <h2 className="text-2xl font-bold">{editableAdminData.name}</h2>
              <p className="text-sm text-default-500">{editableData.role}</p>
            </div>
          </div>

          {isEditing ? (
            <div>
              <Input
                variant="bordered"
                label="Name"
                name="name"
                value={editableAdminData.name}
                onChange={handleAdminInputChange}
                className="mb-2"
              />

              <Input
                variant="bordered"
                label="Title"
                name="title"
                value={editableData.title}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Textarea
                variant="bordered"
                label="Description"
                name="description"
                value={editableData.description}
                onChange={handleInputChange}
                className="mb-2"
                rows={3}
              />
              <Input
                variant="bordered"
                label="Country"
                name="country"
                value={editableData.country}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                variant="bordered"
                label="Address"
                name="address"
                value={editableData.address}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                variant="bordered"
                label="District"
                name="district"
                value={editableData.district}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Button
                onClick={handleSaveClick}
                color="warning"
                size="sm"
                className="w-full"
                isLoading={aboutIsPending || adminIsPending}
                disabled={aboutIsPending || adminIsPending}
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold">{editableData.title}</h3>
              <p className="mb-2 text-xs">{editableData.description}</p>
              <div className="border-t border-default-200 my-2"></div>
              <div className="flex flex-col gap-3">
                <Chip>Country: {editableData.country}</Chip>
                <Chip>Address: {editableData.address}</Chip>
                <Chip>District: {editableData.district}</Chip>
              </div>
            </div>
          )}

          <Button
            onClick={handleEditClick}
            color="warning"
            variant="faded"
            size="sm"
            className="mt-4 w-full text-default-900"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
