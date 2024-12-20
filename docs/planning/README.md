# Development planning

You can find the planned architecture and other development related plans here

### Quick links

- [Architecture](#architecture)
- [UI Mockup](#ui-mockup)
- [API](#api)
- [Process](#process)

### Architecture

![image](https://github.com/user-attachments/assets/2068a685-c64f-421a-a726-04502318fe12)

### UI Mockup

![image](https://github.com/user-attachments/assets/839daa3c-1047-4278-879b-2ad5c8976505)

### API

You can find the API specification [here](openapi.yaml)

### Process

```mermaid
sequenceDiagram
    autonumber
    box  First Participant
    participant sender-ui
    participant sender-backend
    participant sender-edc
    end
    box Other Participant
    participant receiver-edc
    participant receiver-backend
    participant receiver-ui
    end

    Note over sender-ui,receiver-ui: Startup and initialize app on both sides
    par First Participant: Startup and initialize app
        sender-backend ->>+ sender-edc: Check connectivity
        sender-edc -->>- sender-backend: Ok
        sender-backend ->>+ sender-edc: Fetch all data offers
        sender-edc -->>- sender-backend: Return data offers
        opt If notification offering does not exists
            sender-backend ->>+ sender-edc: Create parametrizable notification asset + offer with sender-backend as data source
            sender-edc -->>- sender-backend: Offer
        end
        sender-backend ->>+ sender-edc: Fetch all contracts
        sender-edc -->>- sender-backend: Return contracts
        sender-backend ->> sender-backend: restore previous created chats where outgoing and incoming contract is in place
    and Second Participant: Startup and initialize app
        receiver-backend ->>+ receiver-edc: Check connectivity
        receiver-edc -->>- receiver-backend: Ok
        receiver-backend ->>+ receiver-edc: Fetch all data offers
        receiver-edc -->>- receiver-backend: Return data offers
        opt If notification offering does not exists
            receiver-backend ->>+ receiver-edc: Create parametrizable notification asset + offer with sender-backend as data source
            receiver-edc -->>- receiver-backend: Offer
        end
        receiver-backend ->>+ receiver-edc: Fetch all contracts
        receiver-edc -->>- receiver-backend: Return contracts
        receiver-backend ->> receiver-backend: restore previous created chats where outgoing and incoming contract is in place
    end

    Note right of sender-ui: Open chat
    sender-ui ->>+ sender-backend: Create connector
    opt If counterparty connector is unknown
        sender-backend ->> sender-backend: Create counterparty connector
        %% Negotiate notification contract
        Note right of sender-backend: Negotiate notification contract
        sender-backend ->>+ sender-edc: Query catalog of counterparty connector
        sender-edc ->>+ receiver-edc: Request catalog
        receiver-edc -->>- sender-edc: Catalog
        sender-edc -->>- sender-backend: Catalog
        sender-backend ->>+ sender-edc: Negotiate contract for notification-asset offer
        sender-edc ->>+ receiver-edc: Negotiation
        receiver-edc -->>- sender-edc: Agreement
        sender-edc -->>- sender-backend: Contract
        %% Create message asset offering
        Note right of sender-backend: Create message asset offering
        sender-backend ->>+ sender-edc: Create message asset + BPN restricted policy + offer with sender-backend as data source
        sender-edc -->>- sender-backend: Offer
     end
        sender-backend -->>- sender-ui: ConnectorDto


    Note right of sender-ui: Send chat message
    %%On send message:
    %%- Notify (start TransferRequest) for chat message NotificationDto
    %%- dump EDR token (i.e. do not fetch data)
    sender-ui ->>+ sender-backend: send message
    sender-backend ->> sender-backend: Persist message
    %% Notify counterparty about new message
    Note right of sender-backend: Notify counterparty about new message
    sender-backend ->>+ sender-edc: Initiate data transfer for notification asset with payload
    sender-edc ->>+ receiver-edc: Initiate transfer
    receiver-edc ->>+ receiver-backend: Forward payload
    receiver-backend -->>- receiver-edc: Ack
    receiver-edc -->>- sender-edc: Ack
    sender-edc -->>- sender-backend: Ack
    sender-backend -->>- sender-ui: MessageDto

    Note left of receiver-backend: Process notification
    opt If counterparty connector is unknown
        receiver-backend ->> receiver-backend: Create counterparty connector
        %% Negotiate notification contract (same as on sender side)
        Note left of receiver-backend: Negotiate notification contract (same as on sender side)
        receiver-backend ->>+ receiver-edc: Query catalog of counterparty connector
        receiver-edc ->>+ sender-edc: Request catalog
        sender-edc -->>- receiver-edc: Catalog
        receiver-edc -->>- receiver-backend: Catalog
        receiver-backend ->>+ receiver-edc: Negotiate contract for notification-asset offer
        receiver-edc ->>+ sender-edc: Negotiation
        sender-edc -->>- receiver-edc: Agreement
        receiver-edc -->>- receiver-backend: Contract
        %% Create message asset offering (same as on sender side)
        Note left of receiver-backend: Create message asset offering (same as on sender side)
        receiver-backend ->>+ receiver-edc: Create message asset + BPN restricted policy + offer with sender-backend as data source
        receiver-edc -->>- receiver-backend: Offer
        %% Negotiate asset contract
        Note left of receiver-backend: Negotiate asset contract
        receiver-backend ->>+ receiver-edc: Negotiate contract for message-asset offer
        receiver-edc ->>+ sender-edc: Negotiation
        sender-edc -->>- receiver-edc: Agreement
        receiver-edc -->>- receiver-backend: Contract
    end
    Note left of receiver-backend: Fetch message
    receiver-backend ->>+ receiver-edc: Initiate data transfer for message asset contract
    receiver-edc ->>+ sender-edc: Initiate transfer
    sender-edc ->>+ sender-backend: Request data
    sender-backend -->>- sender-edc: Messages
    sender-edc -->>- receiver-edc: Messages
    receiver-edc -->>- receiver-backend: Messages
 
    
    Note over sender-ui,receiver-ui: Regularly update messages
    par Update messages
        loop Every 10 seconds
            sender-ui ->>+ sender-backend: listMessages
            sender-backend -->>- sender-ui: List<MessageDto>
        end
    and Update messages
        loop Every 10 seconds
        receiver-ui ->>+ receiver-backend: listMessages
        receiver-backend -->>- receiver-ui: List<MessageDto>
        end
    end
```
