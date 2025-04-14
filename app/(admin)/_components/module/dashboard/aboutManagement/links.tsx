'use client';

import { Button, Input, Card } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { useEditLink, useGetLink } from '@/hooks/links.hook';

const UpdateLinkForm = () => {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');
  const editLinkMutation = useEditLink();

  // State to store link data
  const [linkData, setLinkData] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

  // Update form data when link data is fetched
  useEffect(() => {
    if (link?.data) {
      setLinkData(link.data);
      // Set form values dynamically
      Object.keys(link.data).forEach((key) => {
        setValue(key, link.data[key] || '');
      });
    }
  }, [link, setValue]);

  const onSubmit = async (formData: any) => {
    if (!link) return;
    editLinkMutation.mutate({ id: '67bb2077af9ba724ceece4ec', data: formData });
  };

  // Return loading state or actual form
  if (!linkData) {
    return (
      <Card className="p-6 mt-10 shadow-xl bg-default-50 border border-default-100 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-default-700 mb-4">
          Loading...
        </h2>
      </Card>
    );
  }

  return (
    <Card className="p-6 mt-10 shadow-xl bg-default-50 border border-default-100 rounded-lg">
      <h2 className="text-sm md:text-lg font-semibold text-start text-default-700 mb-4">
        Update Link
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Resume" size="sm" {...register('resume')} fullWidth />
          <Input
            label="LinkedIn"
            size="sm"
            {...register('linkedin')}
            fullWidth
          />
          <Input label="GitHub" size="sm" {...register('github')} fullWidth />
          <Input label="Twitter" size="sm" {...register('twitter')} fullWidth />
          <Input
            label="Facebook"
            size="sm"
            {...register('facebook')}
            fullWidth
          />
          <Input
            label="Email"
            size="sm"
            {...register('email')}
            fullWidth
            type="email"
          />
          <Input
            label="Phone"
            size="sm"
            {...register('phone')}
            fullWidth
            type="tel"
          />
          <Input label="Discord" size="sm" {...register('discord')} fullWidth />
        </div>
        <Button
          className="mt-5 text-white w-full md:w-[200px]"
          color="warning"
          disabled={editLinkMutation.isPending}
          isLoading={editLinkMutation.isPending}
          type="submit"
        >
          Update Link
        </Button>
      </form>
    </Card>
  );
};

export default UpdateLinkForm;
