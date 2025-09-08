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
import type {CounterpartyDto} from '@/lib/api/models/counterparty-dto';
import {deleteCounterparty} from '@/lib/api/client';
import {Button} from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteCounterpartyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  counterparty: CounterpartyDto | null;
}

export const DeleteCounterpartyDialog = ({
  isOpen,
  onClose,
  onConfirm,
  counterparty,
}: DeleteCounterpartyDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!counterparty) return;

    setIsDeleting(true);
    try {
      await deleteCounterparty(counterparty.participantId);
      onConfirm();
    } catch (error) {
      console.error('Failed to delete counterparty:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!counterparty) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Chat</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the chat with{' '}
            <span className="font-medium">{counterparty.participantId}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
