'use client';

import {useState, useEffect, useRef} from 'react';
import {listCounterparties} from '@/lib/api/client';
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const initialLoadCompleted = useRef(false);

  // Function to fetch counterparties
  const fetchCounterparties = async (isInitialFetch = false) => {
    try {
      if (isInitialFetch) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const data = await listCounterparties();

      // Ensure data is an array
      const counterpartiesArray = Array.isArray(data) ? data : [];

      if (isInitialFetch) {
        console.log('Initial fetch of counterparties:', counterpartiesArray);
      } else {
        console.log('Refreshed counterparties:', counterpartiesArray);
      }

      setCounterparties(counterpartiesArray);

      // Only set the selected counterparty on initial load if none is selected
      if (
        isInitialFetch &&
        counterpartiesArray.length > 0 &&
        !selectedCounterparty
      ) {
        setSelectedCounterparty(counterpartiesArray[0]);
      } else if (selectedCounterparty) {
        // If a counterparty is selected, update its data with the latest from the server
        const updatedSelectedCounterparty = counterpartiesArray.find(
          (c) => c.participantId === selectedCounterparty.participantId,
        );

        if (updatedSelectedCounterparty) {
          setSelectedCounterparty(updatedSelectedCounterparty);
        }
      }

      if (isInitialFetch) {
        initialLoadCompleted.current = true;
      }
    } catch (error) {
      console.error('Failed to fetch counterparties:', error);
      if (isInitialFetch) {
        setCounterparties([]); // Set to empty array on error during initial load
      }
    } finally {
      if (isInitialFetch) {
        setIsLoading(false);
      }
      setIsRefreshing(false);
    }
  };

  // Initial fetch and setup polling
  useEffect(() => {
    initialLoadCompleted.current = false;
    fetchCounterparties(true);

    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      if (initialLoadCompleted.current) {
        fetchCounterparties(false);
      }
    }, 5000);

    return () => clearInterval(interval);
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

  const handleDeleteConfirm = () => {
    if (counterpartyToDelete) {
      // Update the UI immediately after successful deletion from the server
      const updatedCounterparties = counterparties.filter(
        (c) => c.participantId !== counterpartyToDelete.participantId,
      );

      setCounterparties(updatedCounterparties);

      // If the deleted counterparty was selected, select another one
      if (
        selectedCounterparty?.participantId ===
        counterpartyToDelete.participantId
      ) {
        setSelectedCounterparty(
          updatedCounterparties.length > 0 ? updatedCounterparties[0] : null,
        );
      }

      // Close the dialog and reset state
      setIsDeleteDialogOpen(false);
      setCounterpartyToDelete(null);
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
        isRefreshing={isRefreshing}
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
