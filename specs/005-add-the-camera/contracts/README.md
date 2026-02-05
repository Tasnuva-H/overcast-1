# API Contracts: 005-add-the-camera

This feature does not introduce new API endpoints. Camera preview and mirror toggle are implemented entirely in the client (video-options screen, device-setup modal, and classroom join flow). Mirror preference is passed via existing navigation (e.g. URL query) and applied to the published video stream in the client.

No new contract tests or OpenAPI specs are required for 005.
