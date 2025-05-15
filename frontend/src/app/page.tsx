'use client';

import {useState, useEffect} from 'react';
import {
  listCounterparties,
  deleteCounterparty as deleteCounterpartyApi,
} from '@/lib/api/client';
import type {CounterpartyDto} from '@/lib/api/models/counterparty-dto';
import {ChatSidebar} from '@/components/chat-sidebar';
import {ChatWindow} from '@/components/chat-window';
import {AddCounterpartyDialog} from '@/components/add-counterparty-dialog';
import {DeleteCounterpartyDialog} from '@/components/delete-counterparty-dialog';

const ChatPage = () => {
  const [counterparties, setCounterparties] = useState<CounterpartyDto[]>([]);
  const [selectedCounterparty, setSelectedCounterparty] =
    useState<CounterpartyDto | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [counterpartyToDelete, setCounterpartyToDelete] =
    useState<CounterpartyDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Only fetch counterparties once when the component mounts
  useEffect(() => {
    const fetchCounterparties = async () => {
      try {
        setIsLoading(true);
        const data = await listCounterparties();

        // Ensure data is an array
        const counterpartiesArray = Array.isArray(data) ? data : [];
        console.log('Fetched counterparties:', counterpartiesArray);

        setCounterparties(counterpartiesArray);
        if (counterpartiesArray.length > 0 && !selectedCounterparty) {
          setSelectedCounterparty(counterpartiesArray[0]);
        }
      } catch (error) {
        console.error('Failed to fetch counterparties:', error);
        setCounterparties([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounterparties();
    // Remove selectedCounterparty from dependencies
  }, []);

  const handleCounterpartySelect = (counterparty: CounterpartyDto) => {
    setSelectedCounterparty(counterparty);
  };

  const handleAddCounterparty = (newCounterparty: CounterpartyDto) => {
    setCounterparties((prev) => [...prev, newCounterparty]);
    setSelectedCounterparty(newCounterparty);
    setIsAddDialogOpen(false);
  };

  const handleDeleteClick = (counterparty: CounterpartyDto) => {
    setCounterpartyToDelete(counterparty);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (counterpartyToDelete) {
      try {
        await deleteCounterpartyApi(counterpartyToDelete.participantId);

        setCounterparties((prev) =>
          prev.filter(
            (c) => c.participantId !== counterpartyToDelete.participantId,
          ),
        );

        if (
          selectedCounterparty?.participantId ===
          counterpartyToDelete.participantId
        ) {
          const remainingCounterparties = counterparties.filter(
            (c) => c.participantId !== counterpartyToDelete.participantId,
          );
          setSelectedCounterparty(
            remainingCounterparties.length > 0
              ? remainingCounterparties[0]
              : null,
          );
        }
      } catch (error) {
        console.error('Failed to delete counterparty:', error);
      } finally {
        setIsDeleteDialogOpen(false);
        setCounterpartyToDelete(null);
      }
    }
  };

  return (
    <div className="bg-background flex h-screen">
      <ChatSidebar
        counterparties={counterparties || []} // Ensure it's always an array
        selectedCounterparty={selectedCounterparty}
        onCounterpartySelect={handleCounterpartySelect}
        onAddClick={() => setIsAddDialogOpen(true)}
        onDeleteClick={handleDeleteClick}
        isLoading={isLoading}
      />

      <div className="flex flex-1 flex-col">
        {selectedCounterparty ? (
          <ChatWindow
            key={selectedCounterparty.participantId}
            counterparty={selectedCounterparty}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-semibold">No chat selected</h2>
              <p className="text-muted-foreground">
                Select a chat from the sidebar or create a new one
              </p>
            </div>
          </div>
        )}
      </div>

      <AddCounterpartyDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddCounterparty}
      />

      <DeleteCounterpartyDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        counterparty={counterpartyToDelete}
      />
    </div>
  );
};

export default ChatPage;
