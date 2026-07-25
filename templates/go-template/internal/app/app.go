package app

import "context"

// Run owns the app lifecycle: everything it starts, it joins before returning.
func Run(ctx context.Context) error {
	<-ctx.Done()
	return nil
}
