
#import "NativeReachability.h"
#import "Reachability.h"

@implementation NativeReachability

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(isReachable:(NSString *)address callBack:(RCTResponseSenderBlock)callback)
{
    if ([address length] == 0)
        address = @"8.8.8.8";
    
    Reachability *reachability = [Reachability reachabilityWithHostName:address];
    
    int flag = 0;
    
    switch([reachability currentReachabilityStatus]){
            
        case NotReachable:
            flag = 0;
            break;
        case ReachableViaWiFi:
            flag = 1;
            break;
        case ReachableViaWWAN:
            flag = 1;
            break;
    }
    callback(@[[NSNull null],@(flag)]);
}

@end
