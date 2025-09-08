/*
 * Copyright (c) 2025 sovity GmbH
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Contributors:
 *      sovity GmbH - initial implementation
 */

'use client';

import {useState} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {CounterpartyDto} from '@/lib/api/models/counterparty-dto';
import type {CounterpartyAddDto} from '@/lib/api/models/counterparty-add-dto';
import {addCounterparty} from '@/lib/api/client';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

interface AddCounterpartyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (counterparty: CounterpartyDto) => void;
}

const formSchema = z.object({
  participantId: z.string().min(1, 'Participant ID is required'),
  connectorEndpoint: z.string().url('Must be a valid URL'),
});

export const AddCounterpartyDialog = ({
  isOpen,
  onClose,
  onAdd,
}: AddCounterpartyDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CounterpartyAddDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participantId: '',
      connectorEndpoint: '',
    },
  });

  const onSubmit = async (values: CounterpartyAddDto) => {
    setIsSubmitting(true);
    try {
      const newCounterparty = await addCounterparty(values);
      onAdd(newCounterparty);
      form.reset();
    } catch (error) {
      console.error('Failed to add counterparty:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Chat</DialogTitle>
          <DialogDescription>
            Enter the details of the counterparty you want to chat with.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="participantId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Participant ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter participant ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="connectorEndpoint"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Connector Endpoint</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Chat'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
