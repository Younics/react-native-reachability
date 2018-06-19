@import UIKit;

#import "RNReachability.h"
#import "Reachability.h"

@implementation RNReachability {
    UIBackgroundTaskIdentifier bgTask;
    BOOL isRunning;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents { return @[@"onReachabilityChange", @"onError"]; }

- (void) _start
{
    [self _stop];
    bgTask = [[UIApplication sharedApplication] beginBackgroundTaskWithName:@"RNReachability" expirationHandler:^{
        // Clean up any unfinished task business by marking where you
        // stopped or ending the task outright.
        [[UIApplication sharedApplication] endBackgroundTask:bgTask];
        bgTask = UIBackgroundTaskInvalid;
    }];
    
    isRunning = YES;
    
    UIBackgroundTaskIdentifier thisBgTask = bgTask;
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        if ([self bridge] != nil && thisBgTask == bgTask) {
            BOOL localStatus = YES;
            
            while (isRunning) {
                BOOL internalStatus = [self _isReachable: (NSInteger *) 3000];
                
                if (internalStatus != localStatus) {
                    localStatus = internalStatus;
                    [self sendEventWithName:@"com.younics.reachability:onReachabilityChange" body:@(localStatus)];
                }
                
                [NSThread sleepForTimeInterval:3.0f];
            }
        }
    });
}

- (void) _stop
{
    if (bgTask != UIBackgroundTaskInvalid) {
        isRunning = NO;
        [[UIApplication sharedApplication] endBackgroundTask:bgTask];
        bgTask = UIBackgroundTaskInvalid;
    }
}

RCT_EXPORT_METHOD(startListener)
{
    [self _start];
}

RCT_EXPORT_METHOD(stopListener)
{
    [self _stop];
}

//RCT_EXPORT_METHOD(setTimeout:(int)timeoutId
//                  timeout:(int)timeout
//                  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject)
//{
//    __block UIBackgroundTaskIdentifier task = [[UIApplication sharedApplication] beginBackgroundTaskWithName:@"RNReachability" expirationHandler:^{
//        [[UIApplication sharedApplication] endBackgroundTask:task];
//    }];
//
//    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, timeout * NSEC_PER_MSEC), dispatch_get_main_queue(), ^{
//        if ([self bridge] != nil) {
//            [self sendEventWithName:@"backgroundTimer.timeout" body:[NSNumber numberWithInt:timeoutId]];
//        }
//        [[UIApplication sharedApplication] endBackgroundTask:task];
//    });
//    resolve([NSNumber numberWithBool:YES]);
//}

- (BOOL) _isReachable: (NSInteger *) timeout
{
    NetworkStatus status = [[Reachability reachabilityWithHostName:@"8.8.8.8"] currentReachabilityStatus];
    
    return status == ReachableViaWiFi || status == ReachableViaWWAN ? YES : NO;
}

RCT_EXPORT_METHOD(isReachable: (NSInteger *)timeout resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self _isReachable: timeout]));
}

@end
