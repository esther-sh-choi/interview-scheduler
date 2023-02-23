# Scheduler project breakdown

## Components

- Button
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button

- State: NO STATE
- Props: confirm (boolean), disabled (boolean), danger (boolean), onClick (function), clickable(boolean)
- Used by: Form, Confirm

### DayList

- State: NO STATE
- Props: selected (boolean), spots (number), name (string), setDay(function that accepts day paramenter)
- Used by: Application

### DayListItem

- State: NO STATE
- Props: selected (boolean), spots (number), name (string), setDay(function that points to setDay in DayList)
- Used by: DayList

### InterviewerList

- State: NO STATE
- Props:
- Used by:

### InterviewerListItem

- State: NO STATE
- Props: id (number), name (string), avatar (url), selected (boolean), setInterviewer(function)
- Used by: InterviewerList

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State:
- Props:
- Used by:

### Appointment/Empty

- State:
- Props:
- Used by:

### Appointment/Show

- State:
- Props:
- Used by:

### Appointment/Form

- State:
- Props:
- Used by:

### Appointment/Status

- State:
- Props:
- Used by:

### Appointment/Error

- State:
- Props:
- Used by:

### Appointment/Confirm

- State:
- Props:
- Used by:
